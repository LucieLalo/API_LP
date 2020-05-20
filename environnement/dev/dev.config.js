const path = require('path');
const nodeExternals = require('webpack-node-externals');
const WebpackShellPlugin = require('webpack-shell-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = env => {
  return {
    entry: './src/index.ts',
    mode: env.NODE_ENV,
    target: 'node',
    output: {
      path: path.resolve("./bundle"),
      filename: 'index.js'
    },
    resolve: {  
      extensions: ['.ts', '.js'],
      plugins: [new TsconfigPathsPlugin()]
    },
    watch: env.NODE_ENV === 'development',
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: [
            'ts-loader',
          ]
        }
      ]
    },
    externals: [nodeExternals()],
    plugins: [
      new Dotenv({
        path: './environnement/dev/.dev.env', // load this now instead of the ones in '.env'
        safe: true, // load '.env.example' to verify the '.env' variables are all set. Can also be a string to a different file.
        systemvars: true, // load all the predefined 'process.env' variables which will trump anything local per dotenv specs.
        silent: true, // hide any errors
        defaults: true // load '.env.defaults' as the default values if empty.
      }),
      new WebpackShellPlugin({
        onBuildEnd: ['npm run run:dev']
      })
    ]
  }
}