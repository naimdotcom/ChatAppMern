"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiErrorResponse = exports.ApiSuccessResponse = void 0;
class ApiSuccessResponse {
    constructor(success, message, info) {
        this.success = success;
        this.message = message;
        this.info = info;
        this.success = success;
        this.message = message;
        this.info = info;
    }
}
exports.ApiSuccessResponse = ApiSuccessResponse;
class ApiErrorResponse {
    constructor(success, message, info) {
        this.success = success;
        this.message = message;
        this.info = info;
        this.success = success;
        this.message = message;
        this.info = info;
    }
}
exports.ApiErrorResponse = ApiErrorResponse;
