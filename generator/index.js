const { init } = require('@tauri-apps/cli/dist/api/cli')

module.exports = async (api, options) => {
  init({
    directory: api.resolve('.'),
    appName: options.appName,
    windowTitle: options.windowTitle,
    distDir: 'Set automatically by Vue CLI plugin',
    devPath: 'Set automatically by Vue CLI plugin'
  })

  api.extendPackage({
    scripts: {
      'tauri:serve': 'vue-cli-service tauri:serve',
      'tauri:build': 'vue-cli-service tauri:build'
    }
  })
}
