import { createServer } from "node:http";
import { mkdtemp, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

const port = Number.parseInt(process.argv[2] || "3330", 10);
const dir = await mkdtemp(join(tmpdir(), "browser-annotations-"));
const re = /!\[([^\]]*)\]\(data:image\/(\w+);base64,([A-Za-z0-9+/=]+)\)/g;

const isAllowedOrigin = (origin) => !origin || origin.startsWith("chrome-extension://");

const server = createServer(async (req, res) => {
  const origin = req.headers.origin;

  if (!isAllowedOrigin(origin)) return res.writeHead(403).end();

  if (origin) res.setHeader("Access-Control-Allow-Origin", origin);
  res.setHeader("Vary", "Origin");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.writeHead(204).end();
  if (req.method === "GET") return res.writeHead(200).end("OK");
  if (req.method !== "POST") return res.writeHead(405).end();

  try {
    const chunks = [];
    for await (const chunk of req) chunks.push(chunk);
    let body = Buffer.concat(chunks).toString();

    for (const [match, alt, ext, base64] of body.matchAll(re)) {
      const path = join(dir, `${crypto.randomUUID()}.${ext}`);
      await writeFile(path, Buffer.from(base64, "base64"));
      body = body.replace(match, `![${alt}](${path})`);
    }

    process.stdout.write(`\n${body}\n`);
    res.writeHead(200).end();
  } catch (err) {
    process.stderr.write(`${err.message}\n`);
    res.writeHead(500).end();
  }
});

server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    process.stderr.write(`Port ${port} is in use. Try ${port + 1}.\n`);
  } else {
    process.stderr.write(`${err.message}\n`);
  }
  process.exit(1);
});

server.listen(port, "127.0.0.1", () => {
  process.stdout.write(`Listening: http://127.0.0.1:${port}\n`);
});
