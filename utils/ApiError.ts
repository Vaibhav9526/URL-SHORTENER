interface IApiError {
  statusCode: number;
  message: string;
  success: boolean;
  errors: any[];
  stack?: string;
  data?: null;
}

class ApiError extends Error implements IApiError {
  statusCode;
  message;
  success;
  errors;

  constructor(
    statusCode: number,
    message: string = "something went wrong",
    errors: any[] = [],
    stack?: string,
    data: null = null,
  ) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.success = false;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError };
