module.exports = {
  verbose: true,
  notify: true,
  notifyMode: "success-change",
  silent: true,
  verbose: true,
  collectCoverageFrom: ["**/src/**/*.{js,jsx}", "**/store/**/*.{js,jsx}"],
  coverageThreshold: {
    global: {
      branches: 5,
      functions: 5,
      lines: 5,
      statements: 5
    }
  }
};
