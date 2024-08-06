class AuthorizationError extends Error {
  constructor(message: string | undefined) {
    super(message)
  }
}
export default AuthorizationError
