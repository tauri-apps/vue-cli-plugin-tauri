const cli = require('@tauri-apps/cli')

module.exports = async (api, options) => {
  cli.run([
    'init',
    '--directory', api.resolve('.'),
    '--app-name', options.appName,
    '--window-title', options.windowTitle,
    '--dist-dir', 'Set automatically by Vue CLI plugin',
    '--dev-path', 'Set automatically by Vue CLI plugin'
  ])

  api.extendPackage({
    scripts: {
      'tauri:serve': 'vue-cli-service tauri:serve',
      'tauri:build': 'vue-cli-service tauri:build'
    }
  })
}
