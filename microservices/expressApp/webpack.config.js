import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default {
   mode: 'production',
   target: 'node',
   entry: './src/index.ts',
   experiments: {
      outputModule: true,
   },
   externalsType: 'module',
   externals: {
      'node-gyp': 'module node-gyp',
      npm: 'module npm',
      'mock-aws-s3': 'module mock-aws-s3',
      'aws-sdk': 'module aws-sdk',
      nock: 'module nock',
      bcrypt: 'module bcrypt',
   },
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
                     declaration: false,
                  },
               },
            },
            exclude: /node_modules/,
         },
      ],
   },
   resolve: {
      extensions: ['.ts', '.js', '.json'],
      alias: {
         src: path.resolve(__dirname, 'src'),
         '@test_task/shared': path.resolve(__dirname, '../../shared'),
      },
   },
   output: {
      filename: 'index.mjs',
      path: path.resolve(__dirname, 'dist'),
      module: true,
      clean: true,
      library: {
         type: 'module',
      },
   },
   optimization: {
      minimize: false,
   },
}
