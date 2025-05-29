import axios from "axios";
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
import { useAuth } from "../../context/AuthContext";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [registerFail, setRegisterFail] = useState("");

  const validateForm = () => {
    const newErrors = {};
    if (!name) newErrors.name = "Name is required!";
    if (!username) newErrors.username = "Username is required";
    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (repeatPassword !== password)
      newErrors.repeatPassword = "Password mismatch!";
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
        const response = await axios.post("http://localhost:8080/register", {
          name,
          username,
          password,
          repeatPassword,
        });
        login(response.data.username, response.data.name);
        navigate("/");
      } catch (error) {
        setRegisterFail(error.response.data);
      }
    }
  };

  return (
    <Container className="py-4">
      <Row className="justify-content-center">
        <Col xs={12} sm={10} md={7} lg={4}>
          <Card className="shadow-sm border-0 rounded-4">
            <Card.Body className="p-4">
              <h2 className="mb-3 fw-bold text-center fs-3">Register</h2>
              {registerFail && (
                <Alert variant="danger" className="text-center">
                  {registerFail}
                </Alert>
              )}
              <Form onSubmit={handleSubmit} noValidate>
                <Form.Group className="mb-2" controlId="formName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    isInvalid={!!errors.name}
                    size="md"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-2" controlId="formUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    isInvalid={!!errors.username}
                    size="md"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.username}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-2" controlId="formPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    isInvalid={!!errors.password}
                    size="md"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formRepeatPassword">
                  <Form.Label>Repeat password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Repeat password"
                    value={repeatPassword}
                    onChange={(e) => setRepeatPassword(e.target.value)}
                    isInvalid={!!errors.repeatPassword}
                    size="md"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.repeatPassword}
                  </Form.Control.Feedback>
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  size="md"
                  className="w-100 rounded-pill fw-semibold"
                >
                  Register
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterPage;
