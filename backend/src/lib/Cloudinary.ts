import { v2 as cloudinary } from "cloudinary";
import { config } from "dotenv";
import fs from "fs";

config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (file: Express.Multer.File) => {
  try {
    if (!file) return null;
    //upload the file on cloudinary
    const response = await cloudinary.uploader.upload(file.path, {
      resource_type: "auto",
    });
    // file has been uploaded successfull
    console.log("file is uploaded on cloudinary ", response.url);
    fs.unlinkSync(file.path);
    return response;
  } catch (error) {
    console.log("cloudinary error ", error);
    return null;
  }
};

export default cloudinary;
export { uploadOnCloudinary };
