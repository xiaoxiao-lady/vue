const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  entry: "./test.js",
  output: {
    path: path.resolve(__dirname, "dist/index.js"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
  ],

  mode: "development",
};
