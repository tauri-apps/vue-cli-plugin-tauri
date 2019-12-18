const lnk = require('lnk')
const fs = require('fs')
// Prevent full and unnecessary project creation
process.env.VUE_CLI_TEST = true
// Link ./ to node_modules/vcp-tauri so that require.resolve(vcp-tauri) returns ./
if (!fs.existsSync('./node_modules/vue-cli-plugin-tauri')) {
  try {
    lnk.sync(['./'], './node_modules/vue-cli-plugin-tauri')
  } catch (err) {
    if (err.code !== 'EEXIST') console.error(err)
  }
}

try {
  fs.mkdirSync('./__tests__/temp_projects')
} catch (err) {
  if (err.code !== 'EEXIST') console.error(err)
}
