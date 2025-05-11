import { Request, Response, NextFunction } from 'express'

import ApiError from '../services/apiErrorsHandler.service'

export default (err: ApiError | unknown, _req: Request, res: Response, _next: NextFunction): void => {
   console.log(err)
   if (err instanceof ApiError) {
      res.status(err.status).json({ message: err.message, errors: err.errors })
      return
   }
   res.status(500).json({ message: 'Internal server error', errors: err })
}
