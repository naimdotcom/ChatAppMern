class ApiSuccessResponse<T> {
  constructor(
    public success: boolean,

    public message: string,
    public info: T
  ) {
    this.success = success;
    this.message = message;
    this.info = info;
  }
}

class ApiErrorResponse<T> {
  constructor(public success: boolean, public message: string, public info: T) {
    this.success = success;
    this.message = message;
    this.info = info;
  }
}

export { ApiSuccessResponse, ApiErrorResponse };
