module.exports = pkg => [
  {
    type: 'input',
    name: 'appName',
    message: 'What should the app name be?',
    validate: input => !!input,
    default: pkg.name
  },
  {
    type: 'input',
    name: 'windowTitle',
    message: 'What should the window title be?',
    validate: input => !!input,
    default: 'Tauri App'
  }
]
