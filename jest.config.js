/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  roots: ["<rootDir>/tests/"],
  collectCoverageFrom: ["<rootDir>/src/**/*.ts"],
  coverageDirectory: "<rootDir>/coverage",
  coveragePathIgnorePatterns: ["/node_modules/", "/dist/"],
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    ".+\\.ts$": "ts-jest",
  },
};
