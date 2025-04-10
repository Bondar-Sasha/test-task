import express from 'express'
import { resolve } from 'node:path'
import { config } from 'dotenv'
config({ path: resolve(process.cwd(), '../../.env') })

const app = express()

app.use(express.json())

const PORT = process.env.EXPRESS_APP_PORT

if (!PORT) {
   throw new Error('PORT is not defined')
}

const App = async () => {
   try {
      app.listen(PORT, () => {})
   } catch (error) {
      console.error(error)
   }
}

App()
