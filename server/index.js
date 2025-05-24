import { getAllUsers }from "./db.js";

import express from "express";
const app = express();
import cors from "cors";

app.use(cors());

app.get("/", async (req, res) => {
  res.send(await getAllUsers());
});

app.listen(8080, () => {
  console.log("Server listening  on localhost:8080");
});
