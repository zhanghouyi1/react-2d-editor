const path = require("path");


module.exports = {
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js"
  },
  mode: "development",
  devtool: "cheap-module-eval-source-map",
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 8080,
    hot: true,
    open: true
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  module: {
    rules: [
        {
            test:/\.tsx?$/,
            loader:'ts-loader'
        },
        {
          test:/\.css|less?$/,
          use:['css-loader','less-loader']
      }
    ]
  },
  plugins: [

  ]
};
