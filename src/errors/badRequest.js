class BadRequest extends Error {
  constructor(message) {
    super(message)
  }
}

module.exports = BadRequest
