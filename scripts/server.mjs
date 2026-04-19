#!/usr/bin/env node
// Standalone webhook server，不耦合 pi / claude
// POST /screenshot → 落盘返回 {path}，专服务 Copy 路径
// POST /          → 落盘截图，把 markdown/JSON 打印到 stdout（没有 agent 可推）
// GET  /          → 200 OK，健康检查

import { createServer } from "node:http";
import { mkdtemp, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

const HOST = process.env.BROWSER_ANNOTATIONS_HOST || "127.0.0.1";
const PORT = Number.parseInt(process.env.BROWSER_ANNOTATIONS_PORT || "3330", 10) || 3330;
const dir = await mkdtemp(join(tmpdir(), "browser-annotations-"));

async function saveScreenshot(dataUrl, id = crypto.randomUUID()) {
  const base64 = dataUrl.replace(/^data:image\/\w+;base64,/, "");
  const extension = dataUrl.match(/^data:image\/(\w+)/)?.[1] ?? "png";
  const path = join(dir, `${id}.${extension}`);
  await writeFile(path, Buffer.from(base64, "base64"));
  return path;
}

async function saveJsonScreenshots(body) {
  const targets = [body, ...(Array.isArray(body.annotations) ? body.annotations : [])].filter(
    (t) =>
      t &&
      typeof t === "object" &&
      typeof t.screenshot === "string" &&
      t.screenshot.startsWith("data:"),
  );
  await Promise.all(
    targets.map(async (t) => {
      t.screenshot =
        typeof t.id === "string"
          ? await saveScreenshot(t.screenshot, t.id)
          : await saveScreenshot(t.screenshot);
    }),
  );
}

const MD_IMG = /!\[([^\]]*)\]\((data:image\/\w+;base64,[A-Za-z0-9+/=]+)\)/g;

async function saveMarkdownScreenshots(markdown) {
  const replacements = [];
  for (const match of markdown.matchAll(MD_IMG)) {
    const filePath = await saveScreenshot(match[2]);
    replacements.push({ match: match[0], replacement: `![${match[1]}](${filePath})` });
  }
  let result = markdown;
  for (const { match, replacement } of replacements) result = result.replace(match, replacement);
  return result;
}

async function readBody(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  return Buffer.concat(chunks).toString();
}

const server = createServer(async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.writeHead(204).end();
  if (req.method === "GET") return res.writeHead(200).end("OK");
  if (req.method !== "POST") return res.writeHead(405).end();

  try {
    const rawBody = await readBody(req);

    if (req.url === "/screenshot") {
      const { screenshot } = JSON.parse(rawBody);
      const path = await saveScreenshot(screenshot);
      res.writeHead(200, { "Content-Type": "application/json" }).end(JSON.stringify({ path }));
      return;
    }

    const contentType = req.headers["content-type"] || "";
    let content;
    if (contentType.includes("text/markdown")) {
      content = await saveMarkdownScreenshots(rawBody);
    } else {
      const body = JSON.parse(rawBody);
      await saveJsonScreenshots(body);
      content = JSON.stringify(body, null, 2);
    }

    console.log(`\n--- ${new Date().toISOString()} ---\n${content}\n`);
    res.writeHead(200).end();
  } catch (err) {
    console.error(`Request error: ${err.message}`);
    res.writeHead(400).end();
  }
});

function listen(port, attempts = 0) {
  return new Promise((resolve, reject) => {
    const onError = (err) => {
      if (err.code === "EADDRINUSE" && attempts < 10) resolve(listen(port + 1, attempts + 1));
      else reject(err);
    };
    server.once("error", onError);
    server.once("listening", () => resolve(server.address()));
    server.listen(port, HOST);
  });
}

const shutdown = () => {
  server.close();
  process.exit(0);
};
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

const address = await listen(PORT);
console.log(`browser-annotations listening on http://${address.address}:${address.port}`);
console.log(`tmp dir: ${dir}`);
