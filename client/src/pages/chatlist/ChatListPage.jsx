import { useState, useEffect } from "react";
import ChatPage from "./chat/ChatPage";
import { ListGroup, Container, Row, Col } from "react-bootstrap";
import axios from "axios";

const ChatListPage = () => {

  const [chats, setChats] = useState({});

  const [selectedUser, setSelectedUser] = useState(null);
  const selected = Object.entries(chats).find(
    (chat) => chat[1].username === selectedUser
  );

  useEffect(() => {
    axios
      .post("http://localhost:8080/chats", {
        from: localStorage.getItem("username"),
      })
      .then((res) => {
        setChats(res.data);
      });
  }, []);

  return (
    <>
      <Container style={{ maxWidth: 500}}>
        <Row>
          <Col>
            {!selected ? (
              <ListGroup>
                {Object.entries(chats).map((chat) => (
                  <>
                    <ListGroup.Item
                      key={chat[0]}
                      action
                      active={selectedUser === chat[1].username}
                      onClick={() => setSelectedUser(chat[1].username)}
                      style={{ cursor: "pointer" }}
                    >
                      {chat[1].username}
                    </ListGroup.Item>
                  </>
                ))}
              </ListGroup>
            ) : (
              <ChatPage
                currentUser={localStorage.getItem("username")}
                otherUser={selectedUser}
                onBack={() => setSelectedUser(null)}
              />
            )}
          </Col>
        </Row>
      </Container>
</>
  );
};

export default ChatListPage;
