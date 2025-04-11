import { NestFactory } from '@nestjs/core'
import { config } from 'dotenv'
import { resolve } from 'path'
config({ path: resolve(process.cwd(), '../../.env') })

import { AppModule } from './app.module'
import { EnvService } from './cfg'

async function bootstrap() {
   const app = await NestFactory.create(AppModule)

   const envService = app.get(EnvService)

   await app.listen(envService.getAppPort())
}
void bootstrap()
