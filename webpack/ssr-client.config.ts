import path from 'path';
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';
// import HtmlWebpackPlugin from 'html-webpack-plugin';
// import CopyWebpackPlugin from 'copy-webpack-plugin';
import { DIST_DIR, SRC_DIR } from './env';
import fileLoader from './loaders/file';
import cssLoader from './loaders/css';
import cssModuleLoader from './loaders/css-module';
import svgLoader from './loaders/svg';
import jsLoader from './loaders/js';

// const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const nodeExternals = require('webpack-node-externals');

const config = {
  name: 'ssr_client',

  target: 'node',

  entry: [
    // IS_DEV && 'react-hot-loader/patch',
    // Entry для работы HMR
    // IS_DEV && 'webpack-hot-middlewares/client',
    // IS_DEV && 'css-hot-loader/hotModuleReplacement',
    path.join(SRC_DIR, 'ssr-client'),
  ].filter(Boolean),

  output: {
    path: DIST_DIR,
    filename: 'ssrClient.js',
    libraryTarget: 'commonjs2',
  },

  externalsPresets: { node: true },
  externals: [nodeExternals()],

  devtool: 'source-map',

  resolve: {
    plugins: [new TsconfigPathsPlugin({ configFile: './tsconfig.json' })],
    extensions: ['*', '.js', '.jsx', '.json', '.ts', '.tsx', '.css'],
    modules: ['dist', 'node_modules'],
  },

  module: {
    rules: [
      fileLoader.server,
      cssLoader.server,
      cssModuleLoader.server,
      svgLoader.server,
      jsLoader.server,
    ],
  },

  // plugins: [
  //   new HtmlWebpackPlugin({
  //     template: './public/index.html',
  //     inject: 'body',
  //   }),
  //   new CopyWebpackPlugin({
  //     patterns: [{ from: './public/serviceWorker.js' }],
  //   }),
  //   new SpriteLoaderPlugin(),
  // ],
};

export default config;
