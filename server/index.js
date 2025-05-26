import { getAllUsers, getUser } from "./db.js";

import express from "express";
const app = express();
import cors from "cors";

app.use(cors());

app.get("/", async (req, res) => {
  res.send(await getAllUsers());
});

app.post("/login", async (req, res) => {
  const user = await getUser(req.body.username);
  if (user.password === req.body.password) {
    res.send({ username: user.username });
  }
});

app.listen(8080, () => {
  console.log("Server listening  on localhost:8080");
});
