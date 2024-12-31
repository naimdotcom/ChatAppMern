"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = require("../models/user.model");
const utils_1 = require("../utils");
const verifyJWT = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.cookies["chatapp"];
        if (!token) {
            res
                .status(401)
                .json(new utils_1.ApiErrorResponse(false, utils_1.HttpStatusResponse.unauthorized, "User not logged in"));
            return;
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            res
                .status(401)
                .json(new utils_1.ApiErrorResponse(false, utils_1.HttpStatusResponse.unauthorized, "Invalid token"));
            return;
        }
        const user = yield user_model_1.User.findById(decoded.id).select("-password -__v ");
        if (!user) {
            res
                .status(401)
                .json(new utils_1.ApiErrorResponse(false, utils_1.HttpStatusResponse.unauthorized, "User not found"));
            return;
        }
        req.user = user;
        next();
    }
    catch (error) {
        res
            .status(401)
            .json(new utils_1.ApiErrorResponse(false, utils_1.HttpStatusResponse.unauthorized, "Unauthorized"));
        return;
    }
});
exports.verifyJWT = verifyJWT;
