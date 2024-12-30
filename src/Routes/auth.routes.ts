import { Router } from "express";
import {
  healthCheckAuth,
  login,
  logout,
  signUp,
  updateProfile,
} from "../controllers/auth.controller";
import { verifyJWT } from "../middlewares/auth.middleware";
import { upload } from "../middlewares/multer.middleware";

const _ = Router();

_.post("/signup", signUp);

_.post("/login", login);

_.post("/logout", logout);

_.put(
  "/update-profile",
  verifyJWT as any,
  upload.single("image"),
  updateProfile as any
);

_.get("/health-check", verifyJWT as any, healthCheckAuth as any);

export default _;
