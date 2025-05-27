// AuthContext.js
import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [name, setName] = useState(() => localStorage.getItem("name") || "");
  const [username, setUsername] = useState(
    () => localStorage.getItem("username") || ""
  );

  useEffect(() => {
    setName(!!localStorage.getItem("name"));
    setUsername(!!localStorage.getItem("username"));
  }, []);

  const login = (username, name) => {
    setName(name);
    setUsername(username);
    localStorage.setItem("name", name);
    localStorage.setItem("username", username);
  };

  const logout = () => {
    setName("");
    setUsername("");
    localStorage.removeItem("name");
    localStorage.removeItem("username");
  };

  return (
    <AuthContext.Provider value={{ name, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
