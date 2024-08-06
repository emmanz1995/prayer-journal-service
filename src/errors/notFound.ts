class NotFound extends Error {
  constructor(message: string | undefined) {
    super(message)
  }
}

export default NotFound;
