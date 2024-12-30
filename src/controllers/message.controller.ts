import { Response } from "express";
import {
  ApiErrorResponse,
  ApiSuccessResponse,
  HttpStatusResponse,
  userRequest,
} from "../utils";
import { User } from "../models/user.model";

const getUserForSidebar = async (req: userRequest, res: Response) => {
  try {
    const loggedInUserId = req.user?._id;

    const filterdUser = await User.find({
      _id: { $ne: loggedInUserId },
    });

    res
      .status(200)
      .json(new ApiSuccessResponse(true, HttpStatusResponse.ok, filterdUser));
  } catch (error) {
    console.log("get user for sidebar error", error);
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

export { getUserForSidebar };
