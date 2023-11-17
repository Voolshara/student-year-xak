class ApiError extends Error {
  status: number;
  error: Object;

  constructor(status: number, message: string, error = {}) {
    super(message);
    this.status = status;
    this.error = error;
  }

  static UnathorizedError(): ApiError {
    return new ApiError(401, "Пользователь не авторизован");
  }

  static NotAdminError(): ApiError {
    return new ApiError(401, "У пользователя нет прав");
  }

  static UserExist(message: string = ""): ApiError {
    return new ApiError(
      400,
      message === "" ? "Пользователь уже существует" : message
    );
  }

  static BadRequestError(message: string, error = {}): ApiError {
    return new ApiError(400, message, error);
  }

  static InternalServerError(message: string, error = {}): ApiError {
    return new ApiError(500, message, error);
  }
}

export default ApiError;
