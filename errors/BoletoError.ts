export class BoletoError extends Error {
    constructor(message) {
      super(message);
      this.name = "BoletoError";
      Error.captureStackTrace(this, this.constructor);
    }
}