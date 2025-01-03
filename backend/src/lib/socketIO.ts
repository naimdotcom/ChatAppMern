import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [
      "https://chat-app-node-ynwk.onrender.com",
      /https:\/\/.*\.onrender\.com$/,
      "http://localhost:5173",
      "http://localhost:4000",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

export const getReceiverID = (userId: string) => {
  return userSocketMap[userId];
};

const userSocketMap: { [key: string]: string } = {};

io.on("connection", (socket) => {
  console.log("connected", socket.id);

  const userId = socket.handshake.query.userId as string;
  if (userId) userSocketMap[userId] = socket.id;

  console.log("Current userSocketMap:", userSocketMap);

  // io.emit() is used to send events to all the connected clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("disconnected", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });

  socket.on("error", (err) => {
    console.error(`Socket error on ${socket.id}:`, err);
  });
});

export { io, app, server };
