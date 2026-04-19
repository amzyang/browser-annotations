# Browser Annotations - 常用命令
# 用法：just <recipe>，裸 `just` 列出所有 recipe

set shell := ["bash", "-cu"]

# 默认端口，覆盖用 `PORT=3340 just pi`
PORT := env_var_or_default("BROWSER_ANNOTATIONS_PORT", "3330")

# 列出所有 recipe
default:
    @just --list

# 安装依赖
install:
    pnpm install

# 打包 chrome 插件到 packages/chrome/dist
build:
    pnpm --filter browser-annotations build

# 打包并把扩展拷到 ~/browser-annotations/chrome-extension（首次 Load unpacked，之后到 chrome://extensions reload）
install-extension: build
    node packages/chrome/scripts/install.js

# 独立启动 webhook server，不依赖 pi/claude。Send 路径内容打印到 stdout
server:
    BROWSER_ANNOTATIONS_PORT={{PORT}} node scripts/server.mjs

# 启动 pi 会话并加载 browser-annotations 扩展（进入后输入 /browser-annotations 启动 webhook）
pi:
    BROWSER_ANNOTATIONS_PORT={{PORT}} pnpm --filter @browser-annotations/pi dev

# 启动 Claude Code 并加载开发版 plugin（webhook 随 MCP 自动启动）
claude:
    BROWSER_ANNOTATIONS_PORT={{PORT}} claude --dangerously-load-development-channels plugin:claude@browser-annotations

# 一键自检：lint + format + types
check:
    pnpm run check

# 一键修：lint --fix + format + types
fix:
    pnpm run fix

# 清理构建产物和依赖
clean:
    rm -rf packages/*/dist packages/*/node_modules node_modules
