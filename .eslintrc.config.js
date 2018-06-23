module.exports = {
  extends: [
    "plugin:flowtype/recommended",
    "airbnb",
    "prettier",
    "prettier/flowtype",
    "prettier/react"
  ],
  plugins: ["flowtype"],
  rules: {
    "class-methods-use-this": 0,
    "react/destructuring-assignment": 0,
    "react/sort-comp": 0,
    "react/jsx-filename-extension": 0
  }
};
