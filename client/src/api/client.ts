import type { ErrorResponse } from "./types";

export type ApiCallResponse<T = unknown> = {
  status: number;
  body: T;
};

export class ApiCallError extends Error {
  status: number;
  response?: ApiCallResponse;

  constructor(status: number, message: string, response?: ApiCallResponse) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.response = response;
  }
}

export async function apiCall<T>(path: string): Promise<ApiCallResponse<T>> {
  const response = await fetch(`/api${path}`, {
    headers: { Accept: "application/json" },
  });

  const status = response.status;
  const rawBody = await response.json().catch(() => null);

  if (!response.ok) {
    const body = rawBody as ErrorResponse | null;
    throw new ApiCallError(
      response.status,
      body?.message ?? "Request failed.",
      {
        status,
        body,
      },
    );
  }

  return {
    status,
    body: rawBody as T,
  };
}
