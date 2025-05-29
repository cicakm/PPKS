import express from "express";
import cors from "cors";
import routes from "./routes/routes.js";
import { createServer } from "http";
import { setupSocket } from "./controllers/socket.controller.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", routes);

const server = createServer(app);
setupSocket(server);

server.listen(8080, () => {
  console.log("Server listening on localhost:8080");
});
