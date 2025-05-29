import { useState } from "react";
import { Form, Button, Container, Row, Col, InputGroup } from "react-bootstrap";
import ChatPage from "../../pages/chatlist/chat/ChatPage";

const NewChatComponent = () => {
  const [username, setUsername] = useState("");
  const [chatUser, setChatUser] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim() !== "") {
      setChatUser(username.trim());
    }
  };

  // Replace this with your actual ChatPage component if you have one
  if (chatUser) {
    return (
      <ChatPage
        otherUser={chatUser}
        currentUser={localStorage.getItem("username")}
      />
    );
  }

  return (
    <Container style={{ maxWidth: 400, marginTop: 60, marginBottom: 20 }}>
      <Row>
        <Col>
          <Form onSubmit={handleSubmit}>
            <InputGroup>
              <Form.Control
                id="username"
                type="text"
                placeholder="Chat with:"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Button variant="primary" type="submit">
                Start Chat
              </Button>
            </InputGroup>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default NewChatComponent;
