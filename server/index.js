import {
  createUser,
  getUserByUsername,
  saveMessage,
  getMessages,
  getChats,
} from "./db.js";
import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();

app.use(cors());
app.use(express.json());

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

const users = {};

app.post("/register", async (req, res) => {
  if (
    req.body.name === "" ||
    req.body.name === undefined ||
    req.body.username === "" ||
    req.body.username === undefined ||
    req.body.password === "" ||
    req.body.password === undefined ||
    req.body.repeatPassword === "" ||
    req.body.repeatPassword === undefined
  ) {
    res.status(400).send("All data must be filled!");
  }

  if (req.body.password !== req.body.repeatPassword) {
    res.status(400).send("Password mismatch");
  }

  if (await getUserByUsername(req.body.username)) {
    res
      .status(400)
      .send(`User with username: "${req.body.username}" already exists!`);
  } else {
    await createUser(req.body.name, req.body.username, req.body.password);
    res.status(200).send({ name: req.body.name, username: req.body.username });
  }
});

app.post("/login", async (req, res) => {
  const user = await getUserByUsername(req.body.username);
  if (user) {
    if (user.password === req.body.password) {
      res.send({ name: user.name, username: user.username });
    } else {
      res.status(400).send("Username or password incorrect");
    }
  } else {
    res.status(400).send("Username or password incorrect");
  }
});

app.post("/messages", async (req, res) => {
  const messages = await getMessages(req.body.from, req.body.to);
  res.send(messages);
});

app.post("/chats", async (req, res) => {
  const chats = await getChats(req.body.from);
  res.send(chats);
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

server.listen(8080, () => {
  console.log("Server listening on localhost:8080");
});
