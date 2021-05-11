module.exports = (api, options) => {
  // If plugin options are provided in vue.config.js, those will be used. Otherwise it is empty object
  const pluginOptions =
    options.pluginOptions && options.pluginOptions.tauri
      ? options.pluginOptions.tauri
      : {}

  api.chainWebpack((cfg) => {
    if (process.env.TAURI_SERVE || process.env.TAURI_BUILD) {
      // Set IS_TAURI
      if (cfg.plugins.has('define')) {
        cfg.plugin('define').tap((args) => {
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
      const { dev } = require('@tauri-apps/cli/dist/api/cli')

      // Use custom config for webpack
      process.env.TAURI_SERVE = true

      const server = await api.service.run('serve')

      return dev({
        config: {
          build: {
            devPath: server.url
          }
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
    async (args) => {
      const { build } = require('@tauri-apps/cli/dist/api/cli')
      const { error } = require('@vue/cli-shared-utils')

      // Use custom config for webpack
      process.env.TAURI_BUILD = true
      // Set publicPath so that scripts are properly imported
      options.publicPath = ''

      if (!args.skipBundle) {
        try {
          await api.service.run('build', {
            dest: 'src-tauri/target/webpack_dist'
          })
        } catch (e) {
          error(
            'Vue CLI build failed. Please resolve any issues with your build and try again.'
          )
          process.exit(1)
        }
      }

      build({
        config: {
          build: {
            distDir: './target/webpack_dist'
          }
        },
        verbose: args.v || args.verbose || false,
        debug: args.d || args.debug || false,
        target: args.t || args.target || false,
        bundle: args.b || args.bundle || false
      })
    }
  )
}

module.exports.defaultModes = {
  'tauri:build': 'production',
  'tauri:serve': 'development'
}
