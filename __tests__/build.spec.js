jest.setTimeout(240000)
const create = require('./createProject.helper')

describe('tauri:build', () => {
  it('Should build a tauri app', async () => {
    const project = await create('build')
    await project.run('vue-cli-service tauri:build')
    // Web code is built
    expect(project.has('dist_tauri/bundled/index.html')).toBe(true)
    // Tauri app is built
    expect(project.has('src-tauri/target/release/app')).toBe(true)
  })
})
