# vue-cli-plugin-tauri

> A Vue CLI plugin for rigging [Tauri](https://github.com/tauri-apps/tauri)

Turn your Vue SPA into a tiny cross platform desktop app that is fast and secure.

## Installation

Please read the general Tauri docs if you run into any problems: https://tauri.studio/docs/getting-started/intro/.

### General Prerequisites:

- NodeJS/npm
- Vue CLI (`yarn global add @vue/cli` / `npm i -g @vue/cli`)
- [Rust/Cargo](https://www.rust-lang.org/)
- Tauri CLI (`cargo install tauri-bundler`)
- [Yarn](https://yarnpkg.com/lang/en/) (optional but recommended over npm)

### Detailed Installation Instructions:

- Linux: https://github.com/tauri-apps/tauri/wiki/02.-Linux-Setup
- Mac: https://github.com/tauri-apps/tauri/wiki/03.-MacOS-Setup
- Windows: https://github.com/tauri-apps/tauri/wiki/04.-MS-Windows-Setup

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
