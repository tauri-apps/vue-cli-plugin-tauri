module.exports = {
  testEnvironment: 'node',
  setupFiles: ['<rootDir>/__tests__/testSetup.helper.js'],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/__tests__/temp_projects/',
    '.*.helper.js'
  ]
}
