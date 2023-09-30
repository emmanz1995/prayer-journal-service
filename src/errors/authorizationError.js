class AuthorizationError extends Error {
  constructor(message) {
    super(message)
  }
}
module.exports = AuthorizationError
