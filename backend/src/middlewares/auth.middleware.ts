import Jwt, { JwtPayload } from "jsonwebtoken";
import { IUser, User } from "../models/user.model";
import { NextFunction, Response } from "express";
import {
  ApiErrorResponse,
  CustomRequestHandler,
  HttpStatusResponse,
  userRequest,
} from "../utils";
import { Document } from "mongoose";

const verifyJWT: CustomRequestHandler = async (
  req: userRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies["chatapp"];

    if (!token) {
      res
        .status(401)
        .json(
          new ApiErrorResponse<string>(
            false,
            HttpStatusResponse.unauthorized,
            "User not logged in"
          )
        );
      return;
    }

    const decoded: JwtPayload = Jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;

    if (!decoded) {
      res
        .status(401)
        .json(
          new ApiErrorResponse<string>(
            false,
            HttpStatusResponse.unauthorized,
            "Invalid token"
          )
        );
      return;
    }
    const user = await User.findById(decoded.id).select("-password -__v ");

    if (!user) {
      res
        .status(401)
        .json(
          new ApiErrorResponse<string>(
            false,
            HttpStatusResponse.unauthorized,
            "User not found!"
          )
        );
      return;
    }

    req.user = user as Document<unknown, {}, IUser> & IUser;
    next();
  } catch (error) {
    res
      .status(401)
      .json(
        new ApiErrorResponse<string>(
          false,
          HttpStatusResponse.unauthorized,
          "Unauthorized"
        )
      );
    return;
  }
};

export { verifyJWT };
