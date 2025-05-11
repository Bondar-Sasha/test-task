import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import passport from 'passport'
import { loadSwaggerDocument } from './swagger'
import swaggerUi from 'swagger-ui-express'

import { PrismaClient } from '../generated/prisma'
import errorMiddleware from './middlewares/error.middleware'
import envVars from './services/env.service'
import { AppRoutes } from '@test_task/shared/routes'
import router from './routes'

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

if (envVars.APP_MODE === 'development') {
   app.use(AppRoutes.backendPrefix + '/docs', swaggerUi.serve, swaggerUi.setup(loadSwaggerDocument()))
}

app.use(router)
app.use(errorMiddleware)

export const prismaClient = new PrismaClient()

const App = async () => {
   try {
      await prismaClient.$connect()
      app.listen(envVars.EXPRESS_APP_PORT, () => {
         console.log('auth app')
      })
   } catch (error) {
      console.error(error)
   }
}

App()
