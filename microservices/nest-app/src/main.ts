import { NestFactory, Reflector } from '@nestjs/core'
import * as cookieParser from 'cookie-parser'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { ClassSerializerInterceptor, Logger, ValidationPipe } from '@nestjs/common'
import { json } from 'express'
import { ConfigService } from '@nestjs/config'

import { AppModule } from './app.module'
import { HttpExceptionFilter } from '@utils'

async function bootstrap() {
   const app = await NestFactory.create(AppModule)

   const envService = app.get(ConfigService)
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
      origin: [envService.get('CLIENT_URL')],
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      credentials: true,
   })
   const logger = new Logger()

   app.useGlobalFilters(new HttpExceptionFilter(logger))

   app.setGlobalPrefix('api')

   if (envService.get('APP_MODE') === 'development') {
      const config = new DocumentBuilder()
         .setTitle('App')
         .setDescription('API description')
         .setVersion('1.0')
         .addTag('Instagram App')
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
   }

   await app.listen(envService.get<string>('NEST_APP_PORT')!)
}
void bootstrap()
