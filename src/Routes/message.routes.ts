import express from "express";
import { verifyJWT } from "../middlewares/auth.middleware";
import {
  getUserForSidebar,
  getMessages,
  sendMessage,
} from "../controllers/message.controller";
import { upload } from "../middlewares/multer.middleware";

const _ = express.Router();

_.get("/user", verifyJWT as any, getUserForSidebar as any);

_.get("/user/:id", verifyJWT as any, getMessages as any);

_.post(
  "/send/:id",
  verifyJWT as any,
  upload.single("image"),
  sendMessage as any
);

export default _;
