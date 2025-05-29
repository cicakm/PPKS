import { useState, useEffect } from "react";
import ChatComponent from "../chat/ChatComponent";
import NewChatComponent from "../new-chat/NewChatComponent"
import { ListGroup, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { ChatDots } from "react-bootstrap-icons";

const ChatListComponent = () => {
  const [chats, setChats] = useState({});
  const [selectedUser, setSelectedUser] = useState(null);

  const handleInput = (data) => {
    setSelectedUser(data);
  };

  const fetchChats = () => {
    axios
      .post("http://localhost:8080/chats", {
        from: localStorage.getItem("username"),
      })
      .then((res) => {
        setChats(res.data);
      });
  };

  useEffect(() => {
    fetchChats();
  }, []);

  return (
    <>
      <Container className="py-3">
        <Row className="justify-content-center">
          <Col xs={12} sm={10} md={8} lg={5}>
            {!selectedUser ? (
              <>
                <div className="mb-3">
                  <NewChatComponent onInput={handleInput} />
                </div>
                <ListGroup>
                  {Object.entries(chats).map(([id, chat]) => (
                    <ListGroup.Item
                      variant="primary"
                      key={id}
                      onClick={() => setSelectedUser(chat.username)}
                      style={{ cursor: "pointer" }}
                      className="fw-semibold py-3 mb-2 rounded-3 d-flex align-items-center gap-3"
                    >
                      <ChatDots size={24} />
                      {chat.username}
                    </ListGroup.Item>
                  ))}
                  {Object.keys(chats).length === 0 && (
                    <ListGroup.Item className="text-center text-muted py-4">
                      No chats yet. Start a new conversation!
                    </ListGroup.Item>
                  )}
                </ListGroup>
              </>
            ) : (
              <ChatComponent
                currentUser={localStorage.getItem("username")}
                otherUser={selectedUser}
                onBack={() => {
                  setSelectedUser(null);
                  fetchChats();
                }}
              />
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ChatListComponent;
