import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'
import { HttpService } from '@nestjs/axios'
import { lastValueFrom } from 'rxjs'

@Controller()
export class AppController {
   constructor(
      private readonly appService: AppService,
      private readonly axiosService: HttpService,
   ) {}

   @Get()
   async getHello() {
      const response = await lastValueFrom(this.axiosService.get('http://localhost:3000/'))
      return response.data
   }
}
