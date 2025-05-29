import { Server } from "socket.io";
import { saveMessage } from "../db.js";

export const setupSocket = (server) => {
  const users = {};

  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
    },
  });

  io.on("connection", (socket) => {
    socket.on("register", ({ username }) => {
      users[username] = socket.id;
    });

    socket.on("private message", async ({ message, from, to }) => {
      const id = users[to];
      await saveMessage(from, to, message);
      if (id) {
        io.to(id).emit("private message", {
          message: message,
        });
      }
    });
  });
};
