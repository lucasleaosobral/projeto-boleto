export class BoletoException extends Error {
    constructor(message: string | undefined) {
      super(message);
      this.name = "BoletoError";
      Error.captureStackTrace(this, this.constructor);
    }
}