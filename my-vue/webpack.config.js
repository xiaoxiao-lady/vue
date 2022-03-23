const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    publicPath: "build",
    filename: "index.js",
  },
  devServer: {
    port: 8085,
    contentBase: "www",
    hot: true,
  },
};
