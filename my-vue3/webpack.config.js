const { resolve } = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: resolve(__dirname, "dist/index.js"),
  },
  plugins: [
    new htmlWebpackPlugin({
      template: "./index.html",
    }),
  ],
};
