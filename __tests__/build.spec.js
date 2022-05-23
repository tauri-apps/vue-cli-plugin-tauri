const path = require('path')
const fs = require('fs')

jest.setTimeout(240000)
const create = require('./createProject.helper')

describe('tauri:build', () => {
  it('Should build a tauri app', async () => {
    const project = await create('build')
    const configPath = path.resolve(project.dir, 'src-tauri/tauri.conf.json')
    const config = fs.readFileSync(configPath).toString()
    fs.writeFileSync(configPath, config.replace('com.tauri.dev', 'com.tauri.test'))

    await project.run('vue-cli-service tauri:build')
    // Web code is built
    expect(project.has('src-tauri/target/webpack_dist/index.html')).toBe(true)
    // Tauri app is built
    expect(project.has('src-tauri/target/release/app')).toBe(true)
    expect(
      project.has(
        'src-tauri/target/release/bundle/appimage/app_0.1.0_amd64.AppImage'
      )
    ).toBe(true)
    expect(
      project.has('src-tauri/target/release/bundle/deb/app_0.1.0_amd64.deb')
    ).toBe(true)
  })
})
