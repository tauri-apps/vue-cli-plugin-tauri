# vue-cli-plugin-tauri

> [Tauri](https://tauri.studio) is a toolkit for creating smaller, faster, and more secure desktops applications with a web frontend. This plugin configures Tauri to work in your Vue CLI project.

## Installation

Please visit the [documentation website](https://tauri.studio) or our [discord server](https://discord.gg/tauri) if you have any problems.

### General Prerequisites:

- NodeJS/npm
- Vue CLI (`yarn global add @vue/cli` / `npm i -g @vue/cli`)
- [Rust/Cargo](https://www.rust-lang.org/)

### Detailed Prerequisite Installation Instructions:

- Linux: https://tauri.studio/docs/getting-started/setup-linux
- Mac: https://tauri.studio/docs/getting-started/setup-macos
- Windows: https://tauri.studio/docs/getting-started/setup-windows

### Steps:

1. Create a Vue CLI project (or cd into an existing one)

```bash
vue create my-tauri-app
cd my-tauri-app
```

2. Install Vue CLI Plugin Tauri

```bash
vue add tauri
```

3. Run commands

With Yarn:

```bash
# Start dev server with HMR
yarn tauri:serve
# Build executable
yarn tauri:build
```

With npm:

```bash
# Start dev server with HMR
npm run tauri:serve
# Build executable
npm run tauri:build
```
