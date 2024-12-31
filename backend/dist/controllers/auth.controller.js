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
Object.defineProperty(exports, "__esModule", { value: true });
exports.healthCheckAuth = exports.updateProfile = exports.logout = exports.login = exports.signUp = void 0;
const utils_1 = require("../utils");
const user_model_1 = require("../models/user.model");
const Cloudinary_1 = require("../lib/Cloudinary");
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, name } = req.body;
        if (!email || !password || !name) {
            res
                .status(400)
                .json(new utils_1.ApiErrorResponse(false, utils_1.HttpStatusResponse.badRequest, "Email, password and name are required"));
            return;
        }
        const user = yield user_model_1.User.findOne({ email });
        if (user) {
            res
                .status(400)
                .json(new utils_1.ApiErrorResponse(false, utils_1.HttpStatusResponse.badRequest, "User already exists"));
            return;
        }
        const hashedPassword = yield (0, utils_1.generateHash)(password);
        const newUser = yield user_model_1.User.create({
            email,
            password: hashedPassword,
            name,
        });
        if (!newUser) {
            res
                .status(400)
                .json(new utils_1.ApiErrorResponse(false, utils_1.HttpStatusResponse.badRequest, "User creation failed"));
            return;
        }
        (0, utils_1.generateToken)(newUser._id, res);
        // Process the user creation logic here
        res.status(201).json(new utils_1.ApiSuccessResponse(true, "User created", {
            _id: newUser._id,
            email: newUser.email,
            name: newUser.name,
        }));
        return;
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error instanceof Error ? error.message : "Unknown error",
        });
        return;
    }
});
exports.signUp = signUp;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res
                .status(400)
                .json(new utils_1.ApiErrorResponse(false, utils_1.HttpStatusResponse.badRequest, "Email and password are required"));
            return;
        }
        const user = yield user_model_1.User.findOne({ email });
        if (!user) {
            res
                .status(400)
                .json(new utils_1.ApiErrorResponse(false, utils_1.HttpStatusResponse.badRequest, "User not found"));
            return;
        }
        const isPasswordMatch = yield (0, utils_1.comparePassword)(password, user.password);
        if (!isPasswordMatch) {
            res
                .status(400)
                .json(new utils_1.ApiErrorResponse(false, utils_1.HttpStatusResponse.badRequest, "Invalid password"));
            return;
        }
        (0, utils_1.generateToken)(user._id, res);
        res.status(200).json(new utils_1.ApiSuccessResponse(true, utils_1.HttpStatusResponse.accepted, {
            _id: user._id,
            email: user.email,
            name: user.name,
        }));
        return;
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error instanceof Error ? error.message : "Unknown error",
        });
        return;
    }
});
exports.login = login;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.clearCookie("chatapp");
        res.status(200).json(new utils_1.ApiSuccessResponse(true, utils_1.HttpStatusResponse.accepted, {
            message: "Logout successful",
        }));
        return;
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error instanceof Error ? error.message : "Unknown error",
        });
        return;
    }
});
exports.logout = logout;
const updateProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user } = req;
        const { path } = req.file;
        if (!path) {
            res
                .status(400)
                .json(new utils_1.ApiErrorResponse(false, utils_1.HttpStatusResponse.badRequest, "User not found"));
            return;
        }
        console.log("file from multer", req.file);
        const response = yield (0, Cloudinary_1.uploadOnCloudinary)(req.file);
        if (!response) {
            res
                .status(400)
                .json(new utils_1.ApiErrorResponse(false, utils_1.HttpStatusResponse.badRequest, "No file uploaded"));
        }
        console.log("response from cloudinary", response);
        const updateUser = yield user_model_1.User.findByIdAndUpdate(user === null || user === void 0 ? void 0 : user._id, {
            profilePicture: response === null || response === void 0 ? void 0 : response.url,
        }, { new: true });
        if (!updateUser) {
            res
                .status(400)
                .json(new utils_1.ApiErrorResponse(false, utils_1.HttpStatusResponse.badRequest, "User not found"));
            return;
        }
        console.log(updateUser);
        res
            .status(200)
            .json(new utils_1.ApiSuccessResponse(true, utils_1.HttpStatusResponse.accepted, "Profile updated successfully"));
        return;
    }
    catch (error) {
        res
            .status(500)
            .json(new utils_1.ApiErrorResponse(false, utils_1.HttpStatusResponse.internalServerError, "Internal server error"));
        return;
    }
});
exports.updateProfile = updateProfile;
const healthCheckAuth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        res
            .status(200)
            .json(new utils_1.ApiSuccessResponse(true, utils_1.HttpStatusResponse.ok, user));
    }
    catch (error) {
        console.log("health check auth error", error);
        res
            .status(500)
            .json(new utils_1.ApiErrorResponse(false, utils_1.HttpStatusResponse.internalServerError, "Internal server error"));
        return;
    }
});
exports.healthCheckAuth = healthCheckAuth;
