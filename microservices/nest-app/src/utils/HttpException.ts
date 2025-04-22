import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Logger } from '@nestjs/common'
import { Response, Request } from 'express'

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
   constructor(private readonly logger: Logger) {}
   catch(exception: HttpException, host: ArgumentsHost) {
      const ctx = host.switchToHttp()
      const response = ctx.getResponse<Response>()
      const request = ctx.getRequest<Request>()
      const status = exception.getStatus()

      this.logger.error(`${request.method} ${request.originalUrl} error: ${exception.message}`)

      response.status(status).json({
         message: exception.message,
         errorName: exception.name,
         timestamp: new Date().toISOString(),
         path: request.url,
         statusCode: status,
      })
   }
}
