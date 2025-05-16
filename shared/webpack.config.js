import path from 'path';
import { fileURLToPath } from 'url';
import webpack from 'webpack';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = {
  mode: 'production',
  target: 'node',
  entry: {
    'routes/index': './routes/index.ts',
    'types/index': './types/index.ts'
  },
  experiments: {
    outputModule: true,
  },
  externalsType: 'module',
  externalsPresets: {
    node: true,
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: {
          loader: 'ts-loader',
          options: {
            compilerOptions: {
              module: 'NodeNext',
              moduleResolution: 'NodeNext',
              declaration: true,
              outDir: path.resolve(__dirname, 'dist'),
            },
          },
        },
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
    extensionAlias: {
      '.js': ['.js', '.ts'],
    },
  },
  output: {
    filename: '[name].mjs',
    path: path.resolve(__dirname, 'dist'),
    module: true,
    clean: true,
    library: {
      type: 'module',
    },
  },
  optimization: {
    minimize: true,
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production',
    }),
  ],
  stats: {
    errorDetails: true,
  },
};

export default config;