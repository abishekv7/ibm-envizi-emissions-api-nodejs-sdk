module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['src/tests'],
  testMatch: ['**/*.test.ts'],
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  collectCoverage: true,
  coverageDirectory: './tests/coverage'
};
