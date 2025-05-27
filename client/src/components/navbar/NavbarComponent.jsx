import { useAuth } from "../../context/AuthContext";
import { Navbar, Nav, Container, Button } from "react-bootstrap";

const NavbarComponent = () => {
  const { username, logout } = useAuth();

  return (
    <>
      <Navbar bg="light" expand="lg" className="shadow-sm">
        <Container>
          <Navbar.Brand href="/">ChatApp</Navbar.Brand>
          <Navbar.Toggle aria-controls="main-navbar" />
          <Navbar.Collapse id="main-navbar" className="justify-content-end">
            {username ? (
              <Nav>
                <Button
                  variant="outline-primary"
                  className="rounded-pill fw-semibold px-4"
                  onClick={logout}
                >
                  Logout
                </Button>
              </Nav>
            ) : (
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
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavbarComponent;
