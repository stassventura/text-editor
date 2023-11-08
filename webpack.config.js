module.exports = {
  output: {
    filename: "my-first-webpack.bundle.js",
  },
  module: {
    rules: [{ test: /\.ts$|tsx/, use: "babel-loader" }],
  },
};
