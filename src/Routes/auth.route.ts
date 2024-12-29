import { Router } from "express";
import { login, logout, signUp } from "../controllers/auth.controller";

const _ = Router();

_.post("/signup", signUp);

_.post("/login", login);

_.post("/logout", logout);

export default _;
