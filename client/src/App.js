import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/login/LoginPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/register/RegisterPage";
import { AuthProvider } from "./context/AuthContext";
import NavbarComponent from "./components/navbar/NavbarComponent";

function App() {
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
      </AuthProvider>
    </>
  );
}

export default App;
