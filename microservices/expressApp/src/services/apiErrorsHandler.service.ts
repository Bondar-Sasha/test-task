class ApiError extends Error {
   status: number
   errors: Array<unknown>

   constructor(status: number, message: string, errors: Array<unknown> = []) {
      super(message)
      this.status = status
      this.errors = errors
   }

   public static UnAuthorizedError() {
      return new ApiError(401, 'User is not authorized')
   }

   public static BadRequest(message: string, errors: Array<unknown> = []) {
      return new ApiError(400, message, errors)
   }

   public static ServerError(errors: Array<unknown> = []) {
      return new ApiError(500, 'Server Error', errors)
   }
}

export default ApiError
