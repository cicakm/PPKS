import { createUser, getUserByUsername } from "./db.js";
import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

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

app.listen(8080, () => {
  console.log("Server listening  on localhost:8080");
});
