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
exports.sendMessage = exports.getMessages = exports.getUserForSidebar = void 0;
const utils_1 = require("../utils");
const user_model_1 = require("../models/user.model");
const message_model_1 = require("../models/message.model");
const Cloudinary_1 = require("../lib/Cloudinary");
const socketIO_1 = require("../lib/socketIO");
const getUserForSidebar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const loggedInUserId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        const filterdUser = yield user_model_1.User.find({
            _id: { $ne: loggedInUserId },
        });
        res
            .status(200)
            .json(new utils_1.ApiSuccessResponse(true, utils_1.HttpStatusResponse.ok, filterdUser));
    }
    catch (error) {
        console.log("get user for sidebar error", error);
        res
            .status(500)
            .json(new utils_1.ApiErrorResponse(false, utils_1.HttpStatusResponse.internalServerError, "Internal server error"));
        return;
    }
});
exports.getUserForSidebar = getUserForSidebar;
const getMessages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { id: userToChatID } = req.params;
        const senderId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        const messages = yield message_model_1.Message.find({
            $or: [
                { sender: senderId, receiver: userToChatID },
                { sender: userToChatID, receiver: senderId },
            ],
        });
        res
            .status(200)
            .json(new utils_1.ApiSuccessResponse(true, utils_1.HttpStatusResponse.ok, messages));
        return;
    }
    catch (error) {
        console.log("get messages error", error);
        res
            .status(500)
            .json(new utils_1.ApiErrorResponse(false, utils_1.HttpStatusResponse.internalServerError, "Internal server error"));
        return;
    }
});
exports.getMessages = getMessages;
const sendMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { id } = req.params;
        const { text } = req.body;
        const file = req.file;
        if (!text && !file) {
            res
                .status(400)
                .json(new utils_1.ApiErrorResponse(false, utils_1.HttpStatusResponse.badRequest, "Message is required"));
            return;
        }
        let imgUrl;
        if (file) {
            imgUrl = yield (0, Cloudinary_1.uploadOnCloudinary)(req.file);
            if (!imgUrl) {
                res
                    .status(400)
                    .json(new utils_1.ApiErrorResponse(false, utils_1.HttpStatusResponse.badRequest, "Image upload failed"));
                return;
            }
        }
        const newMessage = new message_model_1.Message({
            sender: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id,
            receiver: id,
            text: text ? text : "",
            image: (imgUrl === null || imgUrl === void 0 ? void 0 : imgUrl.secure_url) ? imgUrl === null || imgUrl === void 0 ? void 0 : imgUrl.secure_url : "",
        });
        yield newMessage.save();
        const receiverSocketID = (0, socketIO_1.getReceiverID)(id);
        if (receiverSocketID) {
            socketIO_1.io.to(receiverSocketID).emit("newMessage", newMessage);
        }
        // const senderSocketID = getReceiverID(String(newMessage?.sender));
        // if (senderSocketID) {
        //   io.to(senderSocketID).emit("newMessage", newMessage);
        // }
        res
            .status(201)
            .json(new utils_1.ApiSuccessResponse(true, utils_1.HttpStatusResponse.created, newMessage));
    }
    catch (error) {
        console.log("send message error", error);
        res
            .status(500)
            .json(new utils_1.ApiErrorResponse(false, utils_1.HttpStatusResponse.internalServerError, "Internal server error"));
        return;
    }
});
exports.sendMessage = sendMessage;
