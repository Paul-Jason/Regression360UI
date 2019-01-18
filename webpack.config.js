const HtmlWebPackPlugin = require("html-webpack-plugin");

 const htmlWebpackPlugin = new HtmlWebPackPlugin({
   template: "./src/index.html",
   filename: "./index.html"
 });

 module.exports = {
    devServer: {
      historyApiFallback: true
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        // Rules for css node-sass
        {
          test: /\.css$/,
          use: [
            { loader: 'style-loader' },
            { loader: 'css-loader' },
            { loader: 'sass-loader' }
          ]
        }
    ]
  },
  plugins: [htmlWebpackPlugin]
};
   