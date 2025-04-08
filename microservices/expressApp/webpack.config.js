import { resolve } from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default {
  mode: 'production',
  entry: './src/index.js',
  target: 'node',
  output: {
    filename: 'index.js',
    path: resolve(__dirname, 'dist'),
    clean: true,
    library: {
      type: 'module',
    },
  },
  experiments: {
    outputModule: true,
  },
  resolve: {
    extensions: ['.js'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  externalsPresets: { node: true },
  // externals: [
  //   '@grpc/grpc-js',
  //   'dotenv',
  //   'shared-for-store',
  //   'proto-for-store',
  // ],
};