const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const copyWebpackPlugin = require("copy-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const getFilesFromDir = require("./config/files");

const PAGE_DIR = path.join("src", "pages", path.sep);

// assign output html files
const htmlFiles = getFilesFromDir(PAGE_DIR, [".html"]);
const htmlPlugins = htmlFiles.map(filePath => {
  const fileName = filePath.replace(PAGE_DIR, "");
  return new HtmlWebPackPlugin({
    chunks: ["main"],
    template: filePath,
    filename: fileName,
    favicon: "./src/images/favicon.ico"
  });
});

module.exports = {
  entry: "./src/js/containers/main.js",
  output: {
    filename: process.env.production ? "[name].[contenthash].bundle.js" : "[name].[hash].bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  plugins: [
    ...htmlPlugins,
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].css"
    }),
    new copyWebpackPlugin([{ from: "src/images", to: "images" }, { from: "src/fonts", to: "fonts" }, { from: "src/js/translation", to: "js/translation" }, { from: "src/images/favicon.ico" }])
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
            outputPath: "images/"
          }
        }
      },
      {
        test: /\.ico$/,
        use: {
          loader: "file-loader"
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
            outputPath: "fonts/"
          }
        }
      }
    ]
  },
  optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCssAssetsPlugin({})]
  }
};
