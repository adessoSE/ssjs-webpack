const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlInlineScriptPlugin = require("html-inline-script-webpack-plugin");

module.exports = {
  entry: ["./src/index.js"],
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./templates/index.ejs",
      inject: false,
    }),
    new HtmlInlineScriptPlugin(),
  ],
  mode: "none",
  optimization: {
    minimize: false,
    concatenateModules: true,
  },
  target: ["web", "es3"],
  module: {
    rules: [
      {
        test: /\.(html)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "./loaders/htmlLoader.js",
            options: {},
          },
        ],
      },
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [["@babel/preset-env"]],
            },
          },
          {
            loader: "./loaders/ssjsLoader.js",
            options: {},
          },
        ],
      },
      {
        test: /\.(amp|ampscript)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "./loaders/ampScriptLoader.js",
            options: {},
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ["*", ".js"],
    alias: {
      polyfills: path.resolve(__dirname, "polyfills/"),
      lib: path.resolve(__dirname, "lib/"),
      templates: path.resolve(__dirname, "templates/")
    },
  },
};
