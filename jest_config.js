export default {
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.js'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  transform: {},
  transformIgnorePatterns: ['node_modules/(?!supertest)']
}
