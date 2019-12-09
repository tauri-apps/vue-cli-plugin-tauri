# vue-cli-plugin-tauri

A Vue CLI plugin for rigging Tauri

## Installation

> Currently not published on npm as it is pre-alpha, but you can test it from git

Prerequisites:

- NodeJS/npm
- Vue CLI (`yarn global add @vue/cli` / `npm i -g @vue/cli`)
- [Rust/Cargo](https://www.rust-lang.org/)
- Tauri CLI (`cargo install tauri-cli`)
- [Yarn](https://yarnpkg.com/lang/en/) (optional but recommended over npm)

Steps:

1. Create a Vue CLI project

```bash
vue create my-tauri-app
cd my-tauri-app
```

2. Install Vue CLI Plugin Tauri

With Yarn:

```bash
yarn add --dev https://github.com/tauri-apps/vue-cli-plugin-tauri
vue invoke tauri
```

With npm:

```bash
npm i --dev https://github.com/tauri-apps/vue-cli-plugin-tauri
vue invoke tauri
```

3. Run commands

With Yarn:

```bash
# Start dev server with HMR
yarn tauri:serve
# Build executable (dist in src-tauri/target/release)
yarn tauri:build
```

With npm:

```bash
# Start dev server with HMR
npm run tauri:serve
# Build executable (dist in src-tauri/target/release)
npm run tauri:build
```
