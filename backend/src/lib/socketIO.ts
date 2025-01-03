import { Server } from "socket.io";
import http from "http";
import expres from "express";

const app = expres();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [
      "https://chat-app-node-ynwk.onrender.com",
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

  const userId = socket.handshake.query.userId;
  if (userId) userSocketMap[userId as string] = socket.id;

  // io.emit() is used to send events to all the connected clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("disconnected", socket.id);
    delete userSocketMap[userId as string];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, app, server };
