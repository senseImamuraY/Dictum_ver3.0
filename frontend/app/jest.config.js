
module.exports = {
  "roots": [
    "<rootDir>/src"
  ],
  "testMatch": [
    "**/__tests__/**/*.+(ts|tsx|js)",
    "**/?(*.)+(spec|test).+(ts|tsx|js)"
  ],
  "transform": {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
  preset: 'ts-jest',
  // testEnvironment: 'jsdom',
  testEnvironment: 'node',
  "moduleNameMapper": {
    ".+\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)?$": "<rootDir>/__mocks__/fileMock.js"
  },
  // moduleDirectories: ["node_modules", __dirname],
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
}