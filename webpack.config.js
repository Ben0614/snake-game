// 引入一個包
const path = require('path');
// 引入html插件
const HTMLWebpackPlugin = require('html-webpack-plugin')
// 引入clean插件
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

// webpack中得所有配置訊息都應該寫在module.export中
module.exports = {
  // 指定入口文件
  entry: "./src/index.ts",

  // 指定打包文件所在目錄
  output: {
    // 指定打包文件的目錄
    path: path.resolve(__dirname, "dist"),
    // 打包後文件的名稱
    filename: "bundle.js",
    // 告訴webpack不使用箭頭函式和const (ie不能兼容箭頭)
    environment: {
      arrowFunction: false,
      const:false
    },
  },

  // 指定webpack打包要使用的模塊
  module: {
    // 指定要加載的規則
    rules: [
      {
        // test指定的是規則生效的文件
        test: /\.ts$/,
        // 要使用的loader
        use: [
          // 配置babel
          {
            // 指定加載器
            loader: "babel-loader",
            // 設置babel
            options: {
              // 設置預定義環境
              presets: [
                [
                  // 指定環境的條件
                  "@babel/preset-env",
                  // 配置訊息
                  {
                    // 要兼容的目標瀏覽器
                    targets: {
                      chrome: "88",
                      ie: "11",
                    },
                    // 指定corejs版本 (到pckage.json看下載的版本為何)
                    corejs: "3",
                    // 使用corejs的方式 (usage按需加載)
                    useBuiltIns: "usage",
                  },
                ],
              ],
            },
          },
          "ts-loader",
        ],
        // 要排除的文件
        exclude: /node-modules/,
      },

      // 指定對scss文件處理
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          "css-loader",
          // 引入postcss
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "postcss-preset-env",
                    {
                      // 兼容瀏覽器最新的兩個版本
                      browsers: "last 2 versions",
                    },
                  ],
                ],
              },
            },
          },
          "sass-loader",
        ],
      },
    ],
  },

  // 配置webpack插件
  plugins: [
    // yarn build時先刪除dist裡面的文件
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      // title:"自定義的標題"
      template: "./src/index.html",
    }),
  ],

  // 用來設置引用模塊
  resolve: {
    extensions: [".ts", ".js"],
  },
};