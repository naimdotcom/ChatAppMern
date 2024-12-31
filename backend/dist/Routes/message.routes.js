"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../middlewares/auth.middleware");
const message_controller_1 = require("../controllers/message.controller");
const multer_middleware_1 = require("../middlewares/multer.middleware");
const _ = express_1.default.Router();
_.get("/users", auth_middleware_1.verifyJWT, message_controller_1.getUserForSidebar);
_.get("/user/:id", auth_middleware_1.verifyJWT, message_controller_1.getMessages);
_.post("/send/:id", auth_middleware_1.verifyJWT, multer_middleware_1.upload.single("image"), message_controller_1.sendMessage);
exports.default = _;
