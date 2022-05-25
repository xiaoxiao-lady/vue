const { resolve } = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.ts",
  output: {
    path: resolve(__dirname, "dist/index.js"),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        include: [resolve("src")],
      },
    ],
  },
  resolve:{
    extensions:['.ts','.tsx','.json','.js']
  },
  plugins: [
    new htmlWebpackPlugin({
      template: "./index.html",
    }),
  ],
};
