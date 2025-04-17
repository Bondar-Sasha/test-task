import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { Logger, ValidationPipe } from '@nestjs/common'

import { AppModule } from './app.module'
import { EnvService } from '@cfg'
import { HttpExceptionFilter } from '@utils'

async function bootstrap() {
   const app = await NestFactory.create(AppModule)

   const envService = app.get(EnvService)

   // app.useGlobalPipes(
   //    new ValidationPipe({
   //       transform: true,
   //       whitelist: true,
   //    }),
   // )

   const { REDIS_USERNAME, REDIS_PASSWORD, REDIS_PORT, REDIS_HOST } = envService.getRedisCredentials()

   app.enableCors({
      origin: [envService.getClientUrl()],
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      credentials: true,
   })
   // const logger = new Logger()

   // app.useGlobalFilters(new HttpExceptionFilter(logger))

   app.setGlobalPrefix('api')
   app.connectMicroservice<MicroserviceOptions>({
      transport: Transport.REDIS,
      options: {
         host: REDIS_HOST,
         port: REDIS_PORT,
         username: REDIS_USERNAME,
         password: REDIS_PASSWORD,
      },
   })
   const config = new DocumentBuilder()
      .setTitle('App')
      .setDescription('API description')
      .setVersion('1.0')
      .addTag('))')
      .build()

   const documentFactory = () => SwaggerModule.createDocument(app, config)
   SwaggerModule.setup('docs', app, documentFactory)

   await Promise.all([app.startAllMicroservices(), app.listen(envService.getAppPort())])
}
void bootstrap()
