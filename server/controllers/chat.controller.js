import { getMessages, getChats } from "../db.js";

export const messageList = async (req, res) => {
  const messages = await getMessages(req.body.from, req.body.to);
  res.send(messages);
};

export const chatList = async (req, res) => {
  const chats = await getChats(req.body.from);
  res.send(chats);
};
