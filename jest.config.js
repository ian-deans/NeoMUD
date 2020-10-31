module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    "@components(.*)$": "<rootDir>/server/src/components/$1",
    "@common(.*)$": "<rootDir>/common/$1"
  },
  roots: [
    "<rootDir>/server/",
    "<rootDir>/client"
  ],
  testMatch: [
    "**/__tests__/**/*.+(ts|tsx|js)",
    "**/?(*.)+(spec|test).+(ts|tsx|js)"
  ],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
};