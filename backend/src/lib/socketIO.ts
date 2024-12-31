import { Server } from "socket.io";
import http from "http";
import expres from "express";

const app = expres();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "http://localhost:3000"],
  },
});

io.on("connection", (socket) => {
  console.log("connected", socket.id);

  socket.on("disconnect", () => {
    console.log("disconnected", socket.id);
  });
});

export { io, app, server };
