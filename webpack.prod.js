const path = require("path");
const common = require("./webpack.common");
const merge = require("webpack-merge");

// clean dist folder on every build
const CleanWebpackPlugin = require("clean-webpack-plugin");

// helps in removing the css from injection and creates a seprate file
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


// removes duplicate css 
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(common, {
  mode: "production",
  output: {
    filename: "[name].[contentHash].bundle.js", // contentHash helps in dealing with caching in the browsers
    path: path.resolve(__dirname, "dist")
  },
  optimization: {
    minimizer: [
      new OptimizeCssAssetsPlugin(),
      new TerserPlugin(), // JS minifier
      new HtmlWebpackPlugin({
        template: "./src/template.html",
        minify: {
          collapseWhitespace: true,
          removeComments: true
        }
      })
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: "[name].[contentHash].css" }),
    new CleanWebpackPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader, //3. Extract css into files
          "css-loader", //2. Turns css into commonjs
          "sass-loader" //1. Turns sass into css
        ]
      }
    ]
  }
});
