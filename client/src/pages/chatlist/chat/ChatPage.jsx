import { useState, useRef, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  ListGroup,
  InputGroup,
} from "react-bootstrap";
import { socket } from "../../../socket";

const ChatPage = ({ currentUser, otherUser }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  // Scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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

  const handleSend = (e) => {
    e.preventDefault();
    if (input.trim() === "") return;
    setMessages([
      ...messages,
      { from: currentUser, to: otherUser, text: input },
    ]);
    socket.emit("private message", {
      message: input,
      from: currentUser,
      to: otherUser,
    });
    setInput("");
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
          <ListGroup variant="flush" style={{ padding: "1rem 0" }}>
            {messages.map((msg, idx) => (
              <ListGroup.Item
                key={idx}
                className="border-0"
                style={{
                  display: "flex",
                  justifyContent:
                    msg.from === currentUser ? "flex-end" : "flex-start",
                  background: "transparent",
                }}
              >
                <div
                  style={{
                    maxWidth: "70%",
                    background:
                      msg.from === currentUser ? "#0d6efd" : "#e9ecef",
                    color: msg.from === currentUser ? "white" : "black",
                    borderRadius: 16,
                    padding: "8px 16px",
                    marginBottom: 4,
                  }}
                >
                  <div>{msg.text}</div>
                </div>
              </ListGroup.Item>
            ))}
            <div ref={messagesEndRef} />
          </ListGroup>
        </Col>
      </Row>
      <Form onSubmit={handleSend}>
        <InputGroup className="p-3">
          <Form.Control
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button type="submit" variant="primary">
            Send
          </Button>
        </InputGroup>
      </Form>
    </Container>
  );
};

export default ChatPage;
