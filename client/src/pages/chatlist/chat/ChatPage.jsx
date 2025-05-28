import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { socket } from "../../../socket";
import MessageListComponent from "../../../components/message-list/MessageListComponent";
import MessageInputComponent from "../../../components/message-input/MessageInputComponent";

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
      <Row
        className="bg-primary text-white p-3"
        style={{ borderTopLeftRadius: 8, borderTopRightRadius: 8 }}
      >
        <Col>
          <h5>
            <span className="fw-bold">{otherUser}</span>
          </h5>
        </Col>
      </Row>
      <Row style={{ height: 400, overflowY: "auto", background: "#f8f9fa" }}>
        <Col>
          <MessageListComponent messages={messages} currentUser={currentUser} />
        </Col>
      </Row>
      <MessageInputComponent onSend={onSend} />
    </Container>
  );
};

export default ChatPage;
