import { Container, Row, Col, Card } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import ChatListPage from "../chatlist/ChatListPage";

const HomePage = () => {
  const { username } = useAuth();

  if (username) {
    return <ChatListPage />;
  }

  return (
    <Container className="py-4">
      <Row className="justify-content-center">
        <Col xs={12} sm={10} md={8} lg={5}>
          <Card className="shadow-sm border-0 rounded-4">
            <Card.Body className="text-center p-4">
              <Card.Title as="h1" className="mb-2 fw-bold fs-2">
                Welcome to Chat App!
              </Card.Title>
              <Card.Text className="mb-4 text-muted fs-6">
                Login or register to chat with people around the world!
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
