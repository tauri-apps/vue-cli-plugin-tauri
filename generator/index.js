const execa = require('execa')
const { error } = require('@vue/cli-shared-utils')
const fs = require('fs-extra')
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
  api.onCreateComplete(() => {
    // Update .gitignore if it exists
    if (fs.existsSync(api.resolve('./.gitignore'))) {
      let gitignore = fs.readFileSync(api.resolve('./.gitignore'), 'utf8')
      if (!/(# Tauri build output|\/dist_tauri)/.test(gitignore)) {
        // Add /dist_tauri to .gitignore if it doesn't exist already
        gitignore = gitignore + '\n#Tauri build output\n/dist_tauri'
        fs.writeFileSync(api.resolve('./.gitignore'), gitignore)
      }
    }
  })
}
