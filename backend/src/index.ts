import express, { Request, Response } from "express";
import dotenv from "dotenv";
import authRoute from "./Routes/auth.routes";
import messageRoute from "./Routes/message.routes";
import { connectDB } from "./lib/DB";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app, server } from "./lib/socketIO";

dotenv.config();

const PORT = process.env.PORT || 5340;
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    // todo: update origin later as the frontend route
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/messages", messageRoute);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

connectDB().then(() => {
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
