import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { socket } from "../../../socket";
import MessageListComponent from "../../../components/message-list/MessageListComponent";
import MessageInputComponent from "../../../components/message-input/MessageInputComponent";
import MessageTitleComponent from "../../../components/message-title/MessageTitleComponent";

const ChatPage = ({ currentUser, otherUser }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.connect();
    socket.on("connect", () => {
      socket.emit("register", { username: currentUser });
    });
    socket.on("private message", ({ message }) => {
      setMessages([
        ...messages,
        { from: otherUser, to: currentUser, text: message },
      ]);
    });
    return () => socket.off("private message");
  });

  const onSend = (input) => {
    setMessages([
      ...messages,
      { from: currentUser, to: otherUser, text: input },
    ]);
    socket.emit("private message", {
      message: input,
      from: currentUser,
      to: otherUser,
    });
  };

  return (
    <Container
      style={{
        maxWidth: 600,
        marginTop: 40,
        border: "1px solid #ddd",
        borderRadius: 8,
        padding: 0,
      }}
    >
      <MessageTitleComponent otherUser={otherUser} />
      <MessageListComponent messages={messages} currentUser={currentUser} />
      <MessageInputComponent onSend={onSend} />
    </Container>
  );
};

export default ChatPage;
