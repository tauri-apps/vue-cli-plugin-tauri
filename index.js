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
      const dev = require('tauri/dist/api/dev')

      // Use custom config for webpack
      process.env.TAURI_SERVE = true

      const server = await api.service.run('serve')

      return dev({
        build: {
          // Has to be a valid dir, contents don't matter
          distDir: api.resolve('.'),
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
    async (args) => {
      const build = require('tauri/dist/api/build')
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

      process.env.CARGO_TARGET_DIR = api.resolve('src-tauri/target');
      build({
        build: {
          // Has to be a non-empty string, value doesn't matter
          devPath: ' ',
          distDir: './target/webpack_dist'
        },
        ctx: { debug: args.debug },
        verbose: args.verbose
      })
    }
  )
}

module.exports.defaultModes = {
  'tauri:build': 'production',
  'tauri:serve': 'development'
}
