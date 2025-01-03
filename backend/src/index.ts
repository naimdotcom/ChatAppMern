import express, { Request, Response } from "express";
import dotenv from "dotenv";
import authRoute from "./Routes/auth.routes";
import messageRoute from "./Routes/message.routes";
import { connectDB } from "./lib/DB";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app, server } from "./lib/socketIO";
import path from "path";

dotenv.config();

const PORT = process.env.PORT || 4000;
// const origin = process.env.FRONTEND_URL || "http://localhost:5173";
const _dirname = path.dirname(__filename);

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "https://chat-app-node-ynwk.onrender.com",
      /https:\/\/.*\.onrender\.com$/,
      "http://localhost:5173",
      "http://localhost:4000",
    ],
    credentials: true,
  })
);

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/messages", messageRoute);

console.log("index.html", _dirname);

app.use(express.static(path.resolve(_dirname, "../../frontend/dist")));

app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.resolve(_dirname, "../../frontend/dist/index.html"));
});

connectDB().then(() => {
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
