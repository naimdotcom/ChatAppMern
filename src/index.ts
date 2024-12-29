import express, { Request, Response } from "express";
import dotenv from "dotenv";
import authRoute from "./Routes/auth.route";
import { connectDB } from "./lib/DB";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 5340;

app.use("/api/v1/auth", authRoute);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
