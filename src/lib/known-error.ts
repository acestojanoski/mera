import type { ErrorCode } from "./types.js";

interface KnownErrorOptions {
  errorCode: ErrorCode;
  message: string;
}

export class KnownError extends Error {
  errorCode: ErrorCode;

  constructor({ errorCode, message }: KnownErrorOptions) {
    super(message);
    this.name = "KnownError";
    this.errorCode = errorCode;
  }
}
