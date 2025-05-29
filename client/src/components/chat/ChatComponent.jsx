import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { socket } from "../../socket";
import MessageListComponent from "../message-list/MessageListComponent";
import MessageInputComponent from "../message-input/MessageInputComponent";
import MessageTitleComponent from "../message-title/MessageTitleComponent";
import axios from "axios";

const ChatComponent = ({ currentUser, otherUser, onBack }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios
      .post("http://localhost:8080/messages", {
        from: currentUser,
        to: otherUser,
      })
      .then((res) => setMessages(res.data));
  }, [currentUser, otherUser]);

  useEffect(() => {
    socket.connect();
    socket.on("connect", () => {
      socket.emit("register", { username: currentUser });
    });
    socket.on("private message", ({ message }) => {
      setMessages([
        ...messages,
        { from: otherUser, to: currentUser, msg: message },
      ]);
    });
    return () => socket.off("private message");
  });

  const onSend = (input) => {
    socket.emit("private message", {
      message: input,
      from: currentUser,
      to: otherUser,
    });
    setMessages([
      ...messages,
      { from: currentUser, to: otherUser, msg: input },
    ]);
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
      <MessageTitleComponent otherUser={otherUser} onBack={onBack} />
      <MessageListComponent messages={messages} currentUser={currentUser} />
      <MessageInputComponent onSend={onSend} />
    </Container>
  );
};

export default ChatComponent;
