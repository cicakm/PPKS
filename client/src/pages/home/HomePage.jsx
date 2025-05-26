import React from "react";
import {
  Navbar,
  Nav,
  Container,
  Row,
  Col,
  Button,
  Card,
} from "react-bootstrap";

const HomePage = () => {
  return (
    <>
      <Navbar bg="light" expand="lg" className="shadow-sm">
        <Container>
          <Navbar.Brand href="/">ChatApp</Navbar.Brand>
          <Navbar.Toggle aria-controls="main-navbar" />
          <Navbar.Collapse id="main-navbar" className="justify-content-end">
            <Nav>
              <Button
                variant="outline-primary"
                className="me-2 rounded-pill fw-semibold px-4"
                href="/login"
              >
                Login
              </Button>
              <Button
                variant="outline-primary"
                className="rounded-pill fw-semibold px-4"
                href="/register"
              >
                Register
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

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
