const path = require("path");
const webpack = require("webpack");

require("dotenv").config({ path: path.resolve(process.cwd(), ".env") });

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: { presets: ["@babel/env"] },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: { extensions: ["*", ".js", ".jsx"] },
  output: {
    path: path.resolve(__dirname, "dist/"),
    publicPath: "/dist/",
    filename: "bundle.js",
  },
  devServer: {
    contentBase: path.join(__dirname, "public/"),
    port: 3000,
    publicPath: "http://localhost:3000/dist/",
    hotOnly: true,
    open: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      "process.env.ADV_APP_ID": JSON.stringify(process.env.ADV_APP_ID),
      "process.env.ADV_KEY": JSON.stringify(process.env.ADV_KEY),
      "process.env.ADV_SECRET": JSON.stringify(process.env.ADV_SECRET),
      "process.env.ADV_CLUSTER": JSON.stringify(process.env.ADV_CLUSTER),
    }),
  ],
};
