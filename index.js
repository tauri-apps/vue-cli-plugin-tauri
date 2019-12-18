module.exports = (api, options) => {
  // If plugin options are provided in vue.config.js, those will be used. Otherwise it is empty object
  const pluginOptions =
    options.pluginOptions && options.pluginOptions.electronBuilder
      ? options.pluginOptions.electronBuilder
      : {}

  api.chainWebpack(cfg => {
    if (process.env.TAURI_BUILD) {
      // Setup require for no-server mode
      const TauriRequirePlugin = require('@tauri-apps/tauri-webpack/plugins/tauri-require')
        .plugin
      cfg.plugin('tauri-require').use(TauriRequirePlugin)

      // Set IS_TAURI
      if (cfg.plugins.has('define')) {
        cfg.plugin('define').tap(args => {
          args[0]['process.env'].IS_TAURI = true
          return args
        })
      } else {
        cfg.plugin('define').use(DefinePlugin, [
          {
            'process.env': { IS_TAURI: true }
          }
        ])
      }

      // Apply custom config from user
      if (pluginOptions.chainWebpack) {
        pluginOptions.chainWebpack(cfg)
      }
    }
  })

  api.registerCommand(
    'tauri:serve',
    {
      // TODO: fill in meta
      description: 'todo',
      usage: 'todo'
    },
    async () => {
      const dev = require('tauri/api/dev')

      const server = await api.service.run('serve')

      return dev({
        build: {
          devPath: server.url
        }
      })
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
      const build = require('tauri/api/build')

      // Use custom config for webpack
      process.env.TAURI_BUILD = true
      // Set publicPath so that scripts are properly imported
      options.publicPath = ''

      if (!args.skipBundle) {
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
      }

      build({
        build: {
          distDir: 'dist_tauri/bundled'
        }
      })
    }
  )
}

module.exports.defaultModes = {
  'tauri:build': 'production',
  'tauri:serve': 'development'
}
