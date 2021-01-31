import path from 'path';

import webpack from 'webpack';
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';
import nodeExternals from 'webpack-node-externals';

export const ROOT_PATH = __dirname;

const DIST_PATH = path.resolve(__dirname, 'dist');
const SRC_PATH = path.resolve(__dirname, 'src');
const LIBS_PATH = path.resolve(__dirname, '../');

export const NODE_ENV = process.env.NODE_ENV || 'development';
export const PORT = parseInt(process.env.PORT || '8017', 0);


const config = {
  context: SRC_PATH,
  mode: NODE_ENV,
  watch: NODE_ENV === 'development',
  module: {
    // @ts-ignore
    rules: [],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          chunks: 'initial',
          filename: 'js/static.js',
          name: 'static',
          test: /node_modules/,
        },
      },
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
      'process.env.PORT': JSON.stringify(PORT),
    }),
  ],
  resolve: {
    extensions: [ '.ts', '.tsx', '.js', '.jsx' ],
    alias: {
      '@reactblog/core': path.resolve(LIBS_PATH, 'reactblog-core', 'src'),
      '@reactblog/ui': path.resolve(LIBS_PATH, 'reactblog-ui', 'src'),
      '@reactblog/node': path.resolve(LIBS_PATH, 'reactblog-node', 'src'),
      'Application': path.resolve(LIBS_PATH, 'reactblog-web', 'src', 'application'),
      'Services': path.resolve(LIBS_PATH, 'reactblog-web', 'src', 'application', 'services'),
    },
    plugins: [
      new TsconfigPathsPlugin(),
    ],
  },
};

module.exports = [
  {
    ...config,
    devtool: NODE_ENV === 'development' ? 'source-map' : null,
    entry: {
      server: path.join(SRC_PATH, 'seo.bootstrap.ts'),
    },
    module: {
      rules: [
        ...config.module.rules,
        {
          test: /\.(ts|tsx)?$/,
          use: 'ts-loader',
        },
      ],
    },
    output: {
      filename: '[name].js',
      path: DIST_PATH,
    },
    externals: [
      nodeExternals(),
    ],
    plugins: [
      ...config.plugins,
      new webpack.DefinePlugin({
        'global.ROOT_PATH': JSON.stringify(ROOT_PATH),
      }),
    ],
    target: 'node',
  }
]
