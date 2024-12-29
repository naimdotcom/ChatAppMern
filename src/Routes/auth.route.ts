import { Router } from "express";
import {
  login,
  logout,
  signUp,
  updateProfile,
} from "../controllers/auth.controller";
import { verifyJWT } from "../middlewares/auth.middleware";

const _ = Router();

_.post("/signup", signUp);

_.post("/login", login);

_.post("/logout", logout);

_.put("/update-profile", verifyJWT, updateProfile);

export default _;
