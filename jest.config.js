/* eslint-disable no-undef,@typescript-eslint/no-var-requires */
const { resolve } = require('path');

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFiles: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^src/(.*)$': resolve(__dirname, './src/$1')
  }
};
