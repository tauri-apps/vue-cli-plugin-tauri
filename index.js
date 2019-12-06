module.exports = api => {
  api.registerCommand(
    'tauri:serve',
    {
      // TODO: fill in meta
      description: 'todo',
      usage: 'todo'
    },
    async () => {
      const { tauriDir } = require('tauri/helpers/app-paths')
      const Runner = require('tauri/runner')
      const tauri = new Runner()

      const server = await api.service.run('serve')

      const tauriConfig = require('tauri/helpers/tauri-config')({
        ctx: {
          debug: true
        },
        build: {
          devPath: server.url
        }
      })

      require('tauri/generator').generate(tauriConfig.tauri)
      require('tauri/entry').generate(tauriDir, tauriConfig)

      tauri.run(tauriConfig)
    }
  )

  api.registerCommand(
    'tauri:build',
    {
      // TODO: fill in meta
      description: 'todo',
      usage: 'todo'
    },
    async args => {
      const { tauriDir } = require('tauri/helpers/app-paths')
      const Runner = require('tauri/runner')
      const tauri = new Runner()
      const tauriConfig = require('tauri/helpers/tauri-config')({
        ctx: {
          debug: args.debug,
          modeDir: tauriDir
        },
        build: {
          distDir: 'dist_tauri/bundled'
        }
      })
      require('tauri/generator').generate(tauriConfig.tauri)
      require('tauri/entry').generate(tauriDir, tauriConfig)

      try {
        await api.service.run('build', {
          dest: 'dist_tauri/bundled'
        })
      } catch (e) {
        error(
          'Vue CLI build failed. Please resolve any issues with your build and try again.'
        )
        process.exit(1)
      }

      tauri.build(tauriConfig)
    }
  )
}

module.exports.defaultModes = {
  'tauri:build': 'production',
  'tauri:serve': 'development'
}
