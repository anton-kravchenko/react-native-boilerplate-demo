module.exports = {
  verbose: true,
  notify: true,
  collectCoverageFrom: ["**/src/**/*.{js,jsx}"],
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 3,
      lines: 3,
      statements: 3
    }
  }
};
