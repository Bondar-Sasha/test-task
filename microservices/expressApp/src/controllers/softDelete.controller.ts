import { NextFunction, Request, Response } from 'express'
import userRepository from '../user.repository'

class SoftDeleteController {
   async deleteUsers(_req: Request, res: Response, next: NextFunction) {
      try {
         await userRepository.usersSoftDeleteTrigger()
         res.json()
      } catch (error) {
         next(error)
      }
   }
   async deleteUser({ body: { id, soft_delete_date } }: Request, res: Response, next: NextFunction) {
      try {
         await userRepository.updateUser(id, { soft_delete_date })
         res.json()
      } catch (error) {
         next(error)
      }
   }
}

export default new SoftDeleteController()
