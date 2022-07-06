module.exports = (api, options) => {
  // If plugin options are provided in vue.config.js, those will be used. Otherwise it is empty object
  const pluginOptions =
    options.pluginOptions && options.pluginOptions.tauri ?
    options.pluginOptions.tauri :
    {}

  api.chainWebpack((cfg) => {
    if (process.env.TAURI_SERVE || process.env.TAURI_BUILD) {
      // Set IS_TAURI
      if (cfg.plugins.has('define')) {
        cfg.plugin('define').tap((args) => {
          args[0]['process.env'].IS_TAURI = true
          return args
        })
      } else {
        cfg.plugin('define').use(DefinePlugin, [{
          'process.env': {
            IS_TAURI: true
          }
        }])
      }

      // Apply custom config from user
      if (pluginOptions.chainWebpack) {
        pluginOptions.chainWebpack(cfg)
      }
    }
  })

  api.registerCommand(
    'tauri:serve', {
      description: 'Starts Tauri in development mode',
      usage: 'vue-cli-service tauri:serve'
    },
    async () => {
      const cli = require('@tauri-apps/cli')

      const server = await api.service.run('serve')
      const config = {
        build: {
          devPath: server.url
        }
      }

      cli.run(['dev', '--config', JSON.stringify(config)])
    }
  )

  api.registerCommand(
    'tauri:build', {
      description: 'Builds the Tauri application',
      usage: 'vue-cli-service tauri:build [options]',
      options: {
        '--skip-bundle': 'skip bundling the frontend application',
        '--verbose': 'enables verbose logging',
        '--debug': 'build with the debug flag',
        '--target': 'target triple to build against. It must be one of the values outputted by `$rustc --print target-list` or `universal-apple-darwin` for an universal macOS application. note that compiling an universal macOS application requires both `aarch64-apple-darwin` and `x86_64-apple-darwin` targets to be installed',
        '--bundle': 'set which applications bundle to package, e.g. "appimage,deb" or "app,dmg". Defaults to all bundles for the current platform',
      }
    },
    async (args) => {
      const cli = require('@tauri-apps/cli')
      const {
        error
      } = require('@vue/cli-shared-utils')

      if (!args['skip-bundle']) {
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

      const config = {
        build: {
          distDir: './target/webpack_dist'
        }
      }
      const cliArgs = ['build', '--config', JSON.stringify(config)]
      if (args.v || args.verbose) {
        cliArgs.push('--verbose')
      }
      if (args.d || args.debug) {
        cliArgs.push('--debug')
      }
      if (args.t || args.target) {
        cliArgs.push('--target')
        cliArgs.push(args.t ? args.t : args.target)
      }
      if (args.b || args.bundle) {
        cliArgs.push('--bundle')
        cliArgs.push(args.b ? args.b : args.bundle)
      }
      await cli.run(cliArgs)
    }
  )
}

module.exports.defaultModes = {
  'tauri:build': 'production',
  'tauri:serve': 'development'
}
