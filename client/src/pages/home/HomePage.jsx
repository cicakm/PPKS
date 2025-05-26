import { Container, Row, Col, Card } from "react-bootstrap";

const HomePage = () => {
  return (
    <>
      <Container>
        <Row className="justify-content-center">
          <Col md={7} lg={5}>
            <Card className="shadow-sm border-0 rounded-4">
              <Card.Body className="text-center p-5">
                <Card.Title as="h1" className="mb-3 fw-bold display-5">
                  Welcome to Chat App!
                </Card.Title>
                <Card.Text className="mb-4 text-muted fs-5">
                  Login or register to chat with other people!
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default HomePage;
