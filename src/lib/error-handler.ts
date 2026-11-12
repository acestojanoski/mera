import type { ErrorHandler } from "hono";
import { HTTPException } from "hono/http-exception";
import type { ContentfulStatusCode } from "hono/utils/http-status";
import { KnownError } from "./known-error.js";
import type { ErrorCode, ErrorResponse } from "./types.js";

const errorCodeToStatusCode: Record<ErrorCode, ContentfulStatusCode> = {
  internal_error: 500,
  not_found: 404,
  unauthorized: 401,
  forbidden: 403,
  validation_error: 400,
};

const statusCodeToErrorCode: Partial<Record<number, ErrorCode>> = {
  400: "validation_error",
  404: "not_found",
  500: "internal_error",
};

const DEAFULT_ERROR_MESSAGE = "Internal server error";

export const errorHandler: ErrorHandler = (error, context) => {
  let statusCode: ContentfulStatusCode = 500;
  let body: ErrorResponse = {
    errorCode: "internal_error",
    message: DEAFULT_ERROR_MESSAGE,
  };

  if (error instanceof KnownError) {
    statusCode = errorCodeToStatusCode[error.errorCode];
    body = {
      errorCode: error.errorCode,
      message: error.message,
    };
  } else if (error instanceof HTTPException) {
    statusCode = error.status as ContentfulStatusCode;
    body = {
      errorCode: statusCodeToErrorCode[statusCode] ?? "internal_error",
      message: error.message || DEAFULT_ERROR_MESSAGE,
    };
  } else {
    console.error("Unhandled error", error);
  }

  return context.json(body, statusCode);
};
