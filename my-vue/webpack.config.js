const { resolve } = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "js/build.js",
    path: resolve(__dirname, "build"),
  },
  module: {
    rules: [
      // 【检查eslint】
      // {
      //   test: /\.js$/,
      //   exclude: /node_modules/,
      //   enforce: "pre", //这个是指的所有的loader里面优先执行的是这个loader
      //   loader: "eslint-loader",
      //   options: {
      //     fix: true, //自动修复eslint的错误
      //   },
      // },
      // 【检查兼容性】
      {
        test: /\.js$/,
        exclude: /node_modules/, //表示不检测安装的第三方包吗，只检测自己的代码
        loader: "babel-loader",
        options: {
          presets: [
            [
              "@babel/preset-env",
              {
                useBuiltIns: "usage", //按需加载
                corejs: {
                  version: 3, //指定 core 版本
                },
                targets: {
                  //指定兼容性做到那个版本的浏览器
                  chrome: "60",
                  firefox: "60",
                  ie: "9",
                  edge: "17",
                  safari: "10",
                },
              },
            ],
          ],
        },
      },
      // 【图片资源】
      // {
      //   test: /\.(png|jpg|gif)$/,
      //   loader: "url-loader",
      //   options: {
      //     limit: 8 * 1024, //表示在8bt之内的话会自动转化为64的结构
      //     esModule: false,
      //     name: "[hash:10].[ext]", //图片重命名[hash:10]取图片的hash前10位，ext表示文件原来的扩展名
      //     outputPath: "imgs",
      //   },
      // },

      {
        exclude: /.(png|jpg|gif|js|css|less|html)/, //排除法
        loader: "file-loader",
      },
    ],
  },
  plugins: [
    new htmlWebpackPlugin({
      template: "./src/index.html",
      minify: {
        // 移除空格
        collapseWhitespace: true,
        // 移除注释
        removeComments: true,
      },
    }),
  ],
  mode: "development",
  devServer: {
    contentBase: resolve(__dirname, "build"),
    compress: true,
    port: 3000,
    open: true,
    hot: true, //开启HMR的功能，webpack配置修改之后需要我们重新执行程序
  },
};
