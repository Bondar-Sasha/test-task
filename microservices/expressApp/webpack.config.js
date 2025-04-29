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
   },
   module: {
      rules: [
         {
            test: /\.ts$/,
            exclude: /node_modules/,
            use: {
               loader: 'ts-loader',
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
}
