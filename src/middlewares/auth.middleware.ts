import Jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../models/user.model";
import { NextFunction, Request, Response } from "express";
import { ApiErrorResponse, HttpStatusResponse, userRequest } from "../utils";

const verifyJWT = async (
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
    }

    const decoded = Jwt.verify(
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
    }
    const user = await User.findById(decoded.id);

    if (Object.keys(user as object).length === 0) {
      res
        .status(401)
        .json(
          new ApiErrorResponse<string>(
            false,
            HttpStatusResponse.unauthorized,
            "User not found"
          )
        );
    }

    req.user = user as object;
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
  }
};

export { verifyJWT };
