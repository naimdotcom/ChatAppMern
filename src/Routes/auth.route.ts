import { Router } from "express";
import {
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

_.put("/update-profile", verifyJWT, upload.single("image"), updateProfile);

export default _;
