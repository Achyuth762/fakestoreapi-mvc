import { createContext, useContext, useState } from "react";
import { loginUser } from "../api/fakestore";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    
    const saved = localStorage.getItem("fakestore_user");
    return saved ? JSON.parse(saved) : null;
  });

  const login = async (username, password) => {
    const data = await loginUser(username, password);
    const userData = { username, token: data.token };
    setUser(userData);
    localStorage.setItem("fakestore_user", JSON.stringify(userData));
    return userData;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("fakestore_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
