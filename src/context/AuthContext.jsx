import React, { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedUserId = localStorage.getItem("userId");
    const storedToken = Cookies.get("token");

    if (storedUser && storedUserId && storedToken) {
      try {
        setUser(JSON.parse(storedUser));
        setUserId(JSON.parse(storedUserId));
        setToken(storedToken);
      } catch (error) {
        console.error("Erro ao carregar dados do localStorage:", error);
        logout();
      }
    } else {
      logout();
    }

    setLoading(false);
  }, []);

  const login = (userData) => {
    const { name, id, token } = userData;
    
    setUser(name);
    setUserId(id);
    setToken(token);
    Cookies.set("token", token, { expires: 7 });

    localStorage.setItem("userId", JSON.stringify(id));
    localStorage.setItem("user", JSON.stringify(name));
  };

  const logout = () => {
    setUser(null);
    setUserId(null);
    setToken(null);
    Cookies.remove("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("user");
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, userId, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
