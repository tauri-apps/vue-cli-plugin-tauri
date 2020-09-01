const execa = require('execa')
const { error } = require('@vue/cli-shared-utils')
const init = require('tauri/dist/api/init')

module.exports = async (api, options) => {
  await execa('cargo', ['tauri-bundler', '--version']).catch(() => {
    error(
      'Tauri bundler crate not installed. Have you installed it with "cargo install tauri-bundler"?'
    )
    process.exit(1)
  })

  init({
    directory: api.resolve('.'),
    appName: options.appName,
    customConfig: {
      build: null,
      tauri: {
        window: {
          title: options.windowTitle
        }
      }
    }
  })

  api.extendPackage({
    scripts: {
      'tauri:serve': 'vue-cli-service tauri:serve',
      'tauri:build': 'vue-cli-service tauri:build'
    }
  })
}
