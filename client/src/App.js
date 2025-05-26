import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
// import axios from "axios";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/login/LoginPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar, Nav, Container, Button } from "react-bootstrap";

// function apiCall() {
//   axios.get("http://localhost:8080").then((data) => {
//     console.log(data.data);
//   });
// }

function App() {
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

      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
