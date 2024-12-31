import { Response } from "express";
import {
  ApiErrorResponse,
  ApiSuccessResponse,
  HttpStatusResponse,
  userRequest,
} from "../utils";
import { User } from "../models/user.model";
import { Message } from "../models/message.model";
import { uploadOnCloudinary } from "../lib/Cloudinary";
import { getReceiverID, io } from "../lib/socketIO";

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

const getMessages = async (req: userRequest, res: Response) => {
  try {
    const { id: userToChatID } = req.params;

    const senderId = req.user?._id;

    const messages = await Message.find({
      $or: [
        { sender: senderId, receiver: userToChatID },
        { sender: userToChatID, receiver: senderId },
      ],
    });

    res
      .status(200)
      .json(new ApiSuccessResponse(true, HttpStatusResponse.ok, messages));
    return;
  } catch (error) {
    console.log("get messages error", error);
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

const sendMessage = async (req: userRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { text } = req.body;
    const file = req.file as Express.Multer.File;

    if (!text && !file) {
      res
        .status(400)
        .json(
          new ApiErrorResponse<string>(
            false,
            HttpStatusResponse.badRequest,
            "Message is required"
          )
        );
      return;
    }
    let imgUrl;

    if (file) {
      imgUrl = await uploadOnCloudinary(req.file as Express.Multer.File);

      if (!imgUrl) {
        res
          .status(400)
          .json(
            new ApiErrorResponse<string>(
              false,
              HttpStatusResponse.badRequest,
              "Image upload failed"
            )
          );
        return;
      }
    }
    const newMessage = new Message({
      sender: req.user?._id,
      receiver: id,
      text: text ? text : "",
      image: imgUrl?.secure_url ? imgUrl?.secure_url : "",
    });

    await newMessage.save();

    const receiverSocketID = getReceiverID(id);

    if (receiverSocketID) {
      io.to(receiverSocketID).emit("newMessage", newMessage);
    }

    // const senderSocketID = getReceiverID(String(newMessage?.sender));
    // if (senderSocketID) {
    //   io.to(senderSocketID).emit("newMessage", newMessage);
    // }

    res
      .status(201)
      .json(
        new ApiSuccessResponse(true, HttpStatusResponse.created, newMessage)
      );
  } catch (error) {
    console.log("send message error", error);
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

export { getUserForSidebar, getMessages, sendMessage };
