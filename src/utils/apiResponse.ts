class ApiSuccessResponse<T> {
  constructor(
    public success: boolean,

    public message: string,
    public data: T
  ) {
    this.success = success;
    this.message = message;
    this.data = data;
  }
}

class ApiErrorResponse<T> {
  constructor(public success: boolean, public message: string, public data: T) {
    this.success = success;
    this.message = message;
    this.data = data;
  }
}

export { ApiSuccessResponse, ApiErrorResponse };
