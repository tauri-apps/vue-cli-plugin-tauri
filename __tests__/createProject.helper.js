const create = require('@vue/cli-test-utils/createTestProject')
const { defaultPreset } = require('@vue/cli/lib/options')
const path = require('path')

module.exports = (projectName) => {
  const preset = { ...defaultPreset }
  preset.plugins['vue-cli-plugin-tauri'] = {
    appName: 'app'
  }
  delete preset.plugins['@vue/cli-plugin-eslint']

  return create(
    projectName,
    preset,
    path.join(process.cwd(), '/__tests__/temp_projects')
  )
}
