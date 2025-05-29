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
    <Navbar bg="light" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fst-italic fw-bold">
          ChatApp
        </Navbar.Brand>
        <Navbar id="main-navbar" className="justify-content-end">
          {username ? (
            <Nav>
              <Nav.Item className="fw-bold fst-italic px-3 py-1 text-primary">
                {localStorage.getItem("username")}
              </Nav.Item>
              <Button
                variant="outline-primary"
                className="rounded-pill fw-semibold px-3 py-1"
                onClick={handleLogout}
                size="sm"
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
                className="rounded-pill fw-semibold px-3 py-1"
                size="sm"
              >
                Login
              </Button>
              <Button
                as={Link}
                to="/register"
                variant="outline-primary"
                className="rounded-pill fw-semibold px-3 py-1"
                size="sm"
              >
                Register
              </Button>
            </Nav>
          )}
        </Navbar>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
