module.exports = {
  roots: ['<rootDir>/__tests__'],
  collectCoverageFrom: ['<rootDir>/src/**/*.js'],
  coverageDirectory: 'coverage',
  coverageProvider: 'babel',
  testEnvironment: 'node',
  moduleNameMapper: {
    '@/tests/(.*)': '<rootDir>/__tests__/$1',
    '@/(.*)': '<rootDir>/src/$1'
  }
}
