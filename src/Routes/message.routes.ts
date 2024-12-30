import express from "express";
import { verifyJWT } from "../middlewares/auth.middleware";
import { getUserForSidebar } from "../controllers/message.controller";

const _ = express.Router();

_.get("/user", verifyJWT as any, getUserForSidebar as any);

export default _;
