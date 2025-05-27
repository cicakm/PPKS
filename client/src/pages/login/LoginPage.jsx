import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loginFail, setLoginFail] = useState("");

  const validateForm = () => {
    const newErrors = {};
    if (!username) newErrors.username = "Username is required";
    if (!password) newErrors.password = "Password is required";
    return newErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      setErrors({});
      try {
        const response = await axios.post("http://localhost:8080/login", {
          username: username,
          password: password,
        });
        localStorage.setItem("username", response.data.username);
        localStorage.setItem("name", response.data.name);
        navigate("/");
      } catch (error) {
        setLoginFail(error.response.data);
      }
    }
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={7} lg={5}>
          <Card className="shadow-sm border-0 rounded-4">
            <Card.Body className="p-5">
              <h2 className="mb-4 fw-bold text-center display-6">Login</h2>
              {loginFail && (
                <Alert variant="danger" className="text-center">
                  {loginFail}
                </Alert>
              )}
              <Form onSubmit={handleSubmit} noValidate>
                <Form.Group className="mb-3" controlId="formUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    isInvalid={!!errors.username}
                    size="lg"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.username}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-4" controlId="formPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    isInvalid={!!errors.password}
                    size="lg"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  size="lg"
                  className="w-100 rounded-pill fw-semibold"
                >
                  Login
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
