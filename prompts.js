module.exports = pkg => [
  {
    type: 'input',
    name: 'windowTitle',
    message: 'What should the window title be?',
    validate: input => !!input,
    default: pkg.name
  }
]
