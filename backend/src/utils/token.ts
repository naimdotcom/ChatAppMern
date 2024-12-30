import jwt from "jsonwebtoken";
import { Response } from "express";
import { Types } from "mongoose";

const generateToken = (id: Types.ObjectId, res: Response) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: "7d",
  });

  res.cookie("chatapp", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // MS
    httpOnly: true, // prevent XSS attacks cross-site scripting attacks
    sameSite: "strict", // CSRF attacks cross-site request forgery attacks
    secure: process.env.NODE_ENV !== "development",
  });

  return token;
};

export { generateToken };
