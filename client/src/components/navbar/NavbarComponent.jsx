import { useAuth } from "../../context/AuthContext";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";

const NavbarComponent = () => {
  const { username, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      <Navbar bg="light" expand="lg" className="shadow-sm">
        <Container>
          <Navbar.Brand as={Link} to="/">
            ChatApp
          </Navbar.Brand>
          <Navbar id="main-navbar" className="justify-content-end">
            {username ? (
              <Nav>
                <Navbar.Brand>{localStorage.getItem("username")}</Navbar.Brand>
                <Button
                  as={Link}
                  to="/chat"
                  variant="outline-primary"
                  className="rounded-pill fw-semibold px-4"
                >
                  Chat
                </Button>
                <Button
                  variant="outline-primary"
                  className="rounded-pill fw-semibold px-4"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </Nav>
            ) : (
              <Nav>
                <Button
                  as={Link}
                  to="/login"
                  variant="outline-primary"
                  className="me-2 rounded-pill fw-semibold px-4"
                >
                  Login
                </Button>
                <Button
                  as={Link}
                  to="/register"
                  variant="outline-primary"
                  className="rounded-pill fw-semibold px-4"
                >
                  Register
                </Button>
              </Nav>
            )}
          </Navbar>
        </Container>
      </Navbar>
    </>
  );
};

export default NavbarComponent;
