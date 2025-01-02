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
const origin =
  process.env.NODE_ENV === "production"
    ? "https://your-production-url.com"
    : "http://localhost:5173";
const _dirname = path.dirname(__filename);

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin,
    credentials: true,
  })
);

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/messages", messageRoute);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve(_dirname, "../frontend/dist")));

  app.get("*", (req: Request, res: Response) => {
    res.sendFile(path.resolve(_dirname, "../frontend", "dist", "index.html"));
  });
}

connectDB().then(() => {
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
