const execa = require('execa')
const { error } = require('@vue/cli-shared-utils')

module.exports = async api => {
  await execa('cargo', ['tauri-cli', '--version']).catch(() => {
    // TODO: provide better error
    error('Tauri CLI crate not installed')
    process.exit(1)
  })
  require('tauri/bin/tauri-init')
  api.extendPackage({
    scripts: {
      'tauri:serve': 'vue-cli-service tauri:serve',
      'tauri:build': 'vue-cli-service tauri:build'
    }
  })
}
