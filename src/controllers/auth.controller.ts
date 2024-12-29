import { error, log } from "console";
import {
  ApiErrorResponse,
  ApiSuccessResponse,
  HttpStatusResponse,
} from "../utils";
import { Request, Response } from "express";
import { User } from "../models/user.model";

const signUp = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      res
        .status(400)
        .json(
          new ApiErrorResponse<string>(
            false,
            HttpStatusResponse.badRequest,
            "Email, password and name are required"
          )
        );
      return;
    }
    const user = await User.findOne({ email });
    if (user) {
      res
        .status(400)
        .json(
          new ApiErrorResponse<string>(
            false,
            HttpStatusResponse.badRequest,
            "User already exists"
          )
        );
      return;
    }

    const newUser = await User.create({
      email,
      password,
      name,
    });

    // Process the user creation logic here
    res.status(201).json(new ApiSuccessResponse(true, "User created", newUser));
    return;
  } catch (error: Error | unknown) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
    return;
  }
};

export { signUp };
