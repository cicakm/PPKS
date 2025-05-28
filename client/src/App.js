import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/login/LoginPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/register/RegisterPage";
import { AuthProvider } from "./context/AuthContext";
import NavbarComponent from "./components/navbar/NavbarComponent";
import { socket } from "./socket";
import { useState, useEffect } from "react";

function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });
    return () => socket.off("message");
  });

  const sendMessage = () => {
    socket.emit("message", message);
    setMessage("");
  };

  return (
    <>
      <AuthProvider>
        <NavbarComponent />

        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </Router>

        <div>
          <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
          <button onClick={sendMessage}>Send</button>
          <ul>
            {messages.map((msg, i) => (
              <li key={i}>{msg}</li>
            ))}
          </ul>
        </div>
      </AuthProvider>
    </>
  );
}

export default App;
