export type ToolError = {
  code: string;
  message: string;
  details?: Record<string, unknown>;
};

export type ToolResponse<T extends Record<string, unknown>> = {
  ok: boolean;
  data?: T;
  error?: ToolError;
  request_id?: string;
};

export function success<T extends Record<string, unknown>>(
  data: T,
  requestId?: string,
): ToolResponse<T> {
  return { ok: true, data, request_id: requestId };
}

export function failure(
  code: string,
  message: string,
  details?: Record<string, unknown>,
  requestId?: string,
): ToolResponse<Record<string, unknown>> {
  return {
    ok: false,
    error: { code, message, details },
    request_id: requestId,
  };
}
