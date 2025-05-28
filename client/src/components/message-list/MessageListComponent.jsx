import { Col, ListGroup, Row } from "react-bootstrap";
import MessageComponent from "../message/MessageComponent";
import { useEffect, useRef } from "react";

const MessageListComponent = ({ messages, currentUser }) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <Row style={{ height: 400, overflowY: "auto", background: "#f8f9fa" }}>
        <Col>
          <ListGroup variant="flush" style={{ padding: "1rem 0" }}>
            {messages.map((msg, idx) => (
              <MessageComponent idx={idx} msg={msg} currentUser={currentUser} />
            ))}
            <div ref={messagesEndRef} />
          </ListGroup>
        </Col>
      </Row>
    </>
  );
};

export default MessageListComponent;
