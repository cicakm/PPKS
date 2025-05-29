import express from "express";
import { login, register } from "../controllers/auth.controller.js";
import { chatList, messageList } from "../controllers/chat.controller.js";
import { validateRegister } from "../middleware/validate.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", validateRegister, register);

router.post("/chats", chatList);
router.post("/messages", messageList);

export default router;
