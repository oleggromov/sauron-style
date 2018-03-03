module.exports = {
  'transform': {
    '\\.[tj]s$': 'ts-jest'
  },
  'testRegex': '.*\\.test\\.js$',
  'testPathIgnorePatterns': [
    '/node_modules/',
    '/build/'
  ],
  'moduleFileExtensions': [
    'ts',
    'js'
  ]
}
