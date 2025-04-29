import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'

import ApiError from '../services/apiErrorsHandler.service'

export default (req: Request, _res: Response, next: NextFunction) => {
   const errors = validationResult(req)

   if (!errors.isEmpty()) {
      throw ApiError.BadRequest('Incorrect data', errors.array())
   }

   next()
}
