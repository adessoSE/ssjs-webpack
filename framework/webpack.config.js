const path = require("path");

const Dotenv = require("dotenv-webpack");
const SsjsPlugin = require('../plugins/SsjsPlugin');
const SsjsConfig = require('../ssjs.config.js');

module.exports = {
  entry: ["./src/index.js"],
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "../dist"),
    clean: true
  },
  plugins: [
    new Dotenv(),
    new SsjsPlugin(SsjsConfig)
  ],
  mode: "none",
  optimization: {
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
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [["@babel/preset-env"]],
            },
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
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      }
    ],
  },
  resolve: {
    extensions: ["*", ".js"],
    alias: {
      polyfills: path.resolve(__dirname, "../polyfills/"),
      lib: path.resolve(__dirname, "../lib/"),
      templates: path.resolve(__dirname, "../templates/"),
    },
  },
};
