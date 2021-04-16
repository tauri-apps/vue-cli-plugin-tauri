jest.setTimeout(240000)
const create = require('./createProject.helper')

describe('tauri:build', () => {
  it('Should build a tauri app', async () => {
    const project = await create('build')
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
