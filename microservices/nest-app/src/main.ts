import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { Logger, ValidationPipe } from '@nestjs/common'

import { AppModule } from './app.module'
import { EnvService } from '@cfg'
import { HttpExceptionFilter } from '@utils'
import { TransformPlainToInstance } from 'class-transformer'

async function bootstrap() {
   const app = await NestFactory.create(AppModule)

   const envService = app.get(EnvService)

   app.useGlobalPipes(
      new ValidationPipe({
         whitelist: true,
         transform: true,
      }),
   )

   app.enableCors({
      origin: [envService.getClientUrl()],
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      credentials: true,
   })
   // const logger = new Logger()

   // app.useGlobalFilters(new HttpExceptionFilter(logger))

   app.setGlobalPrefix('api')

   const config = new DocumentBuilder()
      .setTitle('App')
      .setDescription('API description')
      .setVersion('1.0')
      .addTag('))')
      .build()

   const documentFactory = () => SwaggerModule.createDocument(app, config)
   SwaggerModule.setup('docs', app, documentFactory)

   await app.listen(envService.getAppPort())
}
void bootstrap()
