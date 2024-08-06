class BadRequest extends Error {
  constructor(message: string | undefined) {
    super(message)
  }
}

export default BadRequest;
