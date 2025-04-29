import { resolve } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import dotenv from 'dotenv'

dotenv.config({ path: resolve(process.cwd(), '../../.env') })

const __dirname = dirname(fileURLToPath(import.meta.url))

export default {
   mode: 'production',
   entry: './src/index.ts',
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
      extensions: ['.js', '.ts'],
      alias: {
         '@test_task/shared/*': resolve(__dirname, '../../shared/'),
      },
   },
   externals: {
      'node-gyp': 'commonjs node-gyp',
      'aws-sdk': 'commonjs aws-sdk',
      'mock-aws-s3': 'commonjs mock-aws-s3',
      nock: 'commonjs nock',
      npm: 'commonjs npm',
      bcrypt: 'commonjs bcrypt',
   },
   module: {
      rules: [
         {
            test: /\.ts$/,
            exclude: /node_modules/,
            use: {
               loader: 'ts-loader',
               options: {
                  // Allow importing files outside rootDir
                  compilerOptions: {
                     baseUrl: __dirname,
                     paths: {
                        '@test_task/shared/*': ['../../shared/*'],
                     },
                  },
               },
            },
         },
         {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
               loader: 'babel-loader',
               options: {
                  presets: ['@babel/preset-env', '@babel/preset-typescript'],
               },
            },
         },
      ],
   },
   // Ignore warnings about critical dependencies
   ignoreWarnings: [
      /Critical dependency: the request of a dependency is an expression/,
      /Module not found: Error: Can't resolve/,
   ],
}
