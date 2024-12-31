import {
  ApiErrorResponse,
  ApiSuccessResponse,
  CustomRequestHandler,
  HttpStatusResponse,
  comparePassword,
  generateHash,
  generateToken,
  userRequest,
} from "../utils";
import { Request, Response } from "express";
import { User } from "../models/user.model";
import { uploadOnCloudinary } from "../lib/Cloudinary";

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

    const hashedPassword = await generateHash(password);

    const newUser = await User.create({
      email,
      password: hashedPassword,
      name,
    });

    if (!newUser) {
      res
        .status(400)
        .json(
          new ApiErrorResponse<string>(
            false,
            HttpStatusResponse.badRequest,
            "User creation failed"
          )
        );
      return;
    }
    generateToken(newUser._id, res);

    // Process the user creation logic here
    res.status(201).json(
      new ApiSuccessResponse(true, "User created", {
        _id: newUser._id,
        email: newUser.email,
        name: newUser.name,
      })
    );
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

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res
        .status(400)
        .json(
          new ApiErrorResponse<string>(
            false,
            HttpStatusResponse.badRequest,
            "Email and password are required"
          )
        );
      return;
    }

    const user = await User.findOne({ email });

    if (!user) {
      res
        .status(400)
        .json(
          new ApiErrorResponse<string>(
            false,
            HttpStatusResponse.badRequest,
            "User not found"
          )
        );
      return;
    }

    const isPasswordMatch = await comparePassword(password, user.password);

    if (!isPasswordMatch) {
      res
        .status(400)
        .json(
          new ApiErrorResponse<string>(
            false,
            HttpStatusResponse.badRequest,
            "Invalid password"
          )
        );
      return;
    }

    generateToken(user._id, res);

    res.status(200).json(
      new ApiSuccessResponse(true, HttpStatusResponse.accepted, {
        _id: user._id,
        email: user.email,
        name: user.name,
      })
    );
    return;
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
    return;
  }
};

const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie("chatapp");
    res.status(200).json(
      new ApiSuccessResponse(true, HttpStatusResponse.accepted, {
        message: "Logout successful",
      })
    );
    return;
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
    return;
  }
};

const updateProfile: CustomRequestHandler = async (
  req: userRequest,
  res: Response
): Promise<void> => {
  try {
    const { user } = req;
    const { path } = req.file as Express.Multer.File;

    if (!path) {
      res
        .status(400)
        .json(
          new ApiErrorResponse<string>(
            false,
            HttpStatusResponse.badRequest,
            "User not found"
          )
        );
      return;
    }

    console.log("file from multer", req.file);
    const response = await uploadOnCloudinary(req.file as Express.Multer.File);

    if (!response) {
      res
        .status(400)
        .json(
          new ApiErrorResponse<string>(
            false,
            HttpStatusResponse.badRequest,
            "No file uploaded"
          )
        );
    }

    console.log("response from cloudinary", response);

    const updateUser = await User.findByIdAndUpdate(
      user?._id,
      {
        profilePicture: response?.url,
      },
      { new: true }
    );

    if (!updateUser) {
      res
        .status(400)
        .json(
          new ApiErrorResponse<string>(
            false,
            HttpStatusResponse.badRequest,
            "User not found"
          )
        );
      return;
    }

    console.log(updateUser);

    res
      .status(200)
      .json(
        new ApiSuccessResponse(
          true,
          HttpStatusResponse.accepted,
          "Profile updated successfully"
        )
      );
    return;
  } catch (error) {
    res
      .status(500)
      .json(
        new ApiErrorResponse<string>(
          false,
          HttpStatusResponse.internalServerError,
          "Internal server error"
        )
      );
    return;
  }
};

const healthCheckAuth = async (req: userRequest, res: Response) => {
  try {
    const user = req.user;
    res
      .status(200)
      .json(new ApiSuccessResponse(true, HttpStatusResponse.ok, user));
  } catch (error) {
    console.log("health check auth error", error);
    res
      .status(500)
      .json(
        new ApiErrorResponse<string>(
          false,
          HttpStatusResponse.internalServerError,
          "Internal server error"
        )
      );
    return;
  }
};
export { signUp, login, logout, updateProfile, healthCheckAuth };
