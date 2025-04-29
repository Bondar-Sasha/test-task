import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import passport from 'passport'
import { swaggerUi, swaggerDocument } from './swagger'
import { PrismaClient } from '../generated/prisma'

import errorMiddleware from './middlewares/error.middleware'
import envVars from './services/env.service'
import { AppRoutes } from '@test_task/shared/routes'
import router from './routes'
import { resolve } from 'path'
import { existsSync, writeFileSync } from 'fs'

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(
   cors({
      credentials: true,
      origin: [envVars.CLIENT_URL],
   }),
)
app.use(passport.initialize())

app.use(AppRoutes.backendPrefix + '/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.get('/', (_req, res) => {
   res.send('Hello World!')
})
app.use(router)
app.use(errorMiddleware)

const PORT = process.env.EXPRESS_APP_PORT

if (!PORT) {
   throw new Error('PORT is not defined')
}

const dbUrl = `postgresql://${envVars.POSTGRES_USER}:${envVars.POSTGRES_PASSWORD}@${envVars.POSTGRES_HOST}:${envVars.POSTGRES_PORT}/${envVars.POSTGRES_DB}`

const envFilePath = resolve(process.cwd(), '.', '.env')

if (!existsSync(envFilePath)) {
   const envContent = `DB_URL=${dbUrl}\n`
   writeFileSync(envFilePath, envContent)
   console.log('.env file created successfully.')
}

export const prismaClient = new PrismaClient()

const App = async () => {
   try {
      app.listen(PORT, () => {})
      await prismaClient.$connect()
   } catch (error) {
      console.error(error)
   }
}

App()
