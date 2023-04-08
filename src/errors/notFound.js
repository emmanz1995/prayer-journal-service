import CustomError from "./customError";
import StatusCode from "http-status-codes";

class NotFound extends CustomError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCode.NOT_FOUND;
  }
}

export default NotFound;
