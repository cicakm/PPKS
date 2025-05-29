import { useState } from "react";
import { Form, Button, Container, Row, Col, InputGroup } from "react-bootstrap";
import { ChatDots } from "react-bootstrap-icons";

const NewChatComponent = ({ onInput }) => {
  const [username, setUsername] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim() !== "") {
      onInput(username);
    }
  };

  return (
    <Container
      className="px-0"
      style={{ maxWidth: 350, marginTop: 24, marginBottom: 12 }}
    >
      <Row>
        <Col>
          <Form onSubmit={handleSubmit}>
            <InputGroup size="sm">
              <Form.Control
                id="username"
                type="text"
                placeholder="Start chat with:"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Button
                variant="primary"
                type="submit"
                size="sm"
                className="rounded-end-pill px-3"
              >
                <ChatDots size={20} className="mb-1" />
              </Button>
            </InputGroup>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default NewChatComponent;
