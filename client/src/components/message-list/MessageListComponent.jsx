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
      <Row
        className="flex-grow-1"
        style={{
          minHeight: 0,
          maxHeight: 400,
          overflowY: "auto",
          background: "#f8f9fa",
          borderRadius: "0 0 16px 16px",
        }}
      >
        <Col className="px-0">
          <ListGroup variant="flush" className="py-3 px-2">
            {messages.map((msg, idx) => (
              <MessageComponent
                key={idx}
                idx={idx}
                msg={msg}
                currentUser={currentUser}
              />
            ))}
            <div ref={messagesEndRef} />
          </ListGroup>
        </Col>
      </Row>
    </>
  );
};

export default MessageListComponent;
