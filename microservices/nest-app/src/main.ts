import { NestFactory, Reflector } from '@nestjs/core'
import * as cookieParser from 'cookie-parser'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { ClassSerializerInterceptor, Logger, ValidationPipe } from '@nestjs/common'
import { json } from 'express'

import { AppModule } from './app.module'
import { EnvService } from '@cfg'
import { HttpExceptionFilter } from '@utils'

async function bootstrap() {
   const app = await NestFactory.create(AppModule)

   const envService = app.get(EnvService)
   app.use(json())
   app.use(cookieParser())

   app.useGlobalPipes(
      new ValidationPipe({
         transform: true,
         whitelist: true,
         transformOptions: {
            excludeExtraneousValues: true,
         },
      }),
   )
   app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector), { excludeExtraneousValues: true }))

   app.enableCors({
      origin: [envService.getClientUrl()],
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      credentials: true,
   })
   const logger = new Logger()

   app.useGlobalFilters(new HttpExceptionFilter(logger))

   app.setGlobalPrefix('api')

   const config = new DocumentBuilder()
      .setTitle('App')
      .setDescription('API description')
      .setVersion('1.0')
      .addTag('Instagram App')
      .addServer(envService.getClientUrl(), 'Local Development')
      .addBearerAuth({ type: 'oauth2' })
      .build()

   const documentFactory = () => SwaggerModule.createDocument(app, config)

   const swaggerUIOptions = {
      swaggerOptions: {
         followRedirects: true,
         redirectDepth: 5,
         persistAuthorization: true,
         displayRequestDuration: true,
         filter: true,
      },

      customSiteTitle: 'App API Documentation',
   }

   SwaggerModule.setup('/api/docs', app, documentFactory, swaggerUIOptions)

   await app.listen(envService.getAppPort())
}
void bootstrap()
