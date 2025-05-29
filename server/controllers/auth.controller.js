import { createUser, getUserByUsername } from "../db.js";

export const register = async (req, res) => {
  try {
    if (await getUserByUsername(req.body.username)) {
      res
        .status(400)
        .send(`User with username: "${req.body.username}" already exists!`);
    } else {
      await createUser(req.body.name, req.body.username, req.body.password);
      res
        .status(200)
        .send({ name: req.body.name, username: req.body.username });
    }
  } catch (error) {
    res.send(error);
  }
};

export const login = async (req, res) => {
  try {
    const user = await getUserByUsername(req.body.username);

    if (user) {
      if (user.password === req.body.password) {
        res.send({ name: user.name, username: user.username });
      } else {
        res.status(401).send("Username or password incorrect");
      }
    } else {
      res.status(401).send("Username or password incorrect");
    }
  } catch (error) {
    res.send(error);
  }
};
