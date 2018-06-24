module.exports = {
  verbose: true,
  notify: true,
  notifyMode: "success-change",
  silent: true,
  verbose: true,
  collectCoverageFrom: ["**/src/**/*.{js,jsx}", "**/store/**/*.{js,jsx}"],
  coverageThreshold: {
    global: {
      branches: 20,
      functions: 20,
      lines: 20,
      statements: 20
    }
  }
};
