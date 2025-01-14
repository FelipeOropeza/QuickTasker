import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import LoginForm from "../components/LoginForm";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

function Login() {
  const { login } = useContext(AuthContext);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (userData) => {
    try {
      const response = await axios.post(`${apiUrl}/auth/login`, userData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setMessage("Login realizado com sucesso");
      setTimeout(() => {
        login(response.data);
        setMessage("");
        navigate("/home");
      }, 2000);

    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setMessage(error.response.data.message);
      } else {
        setMessage("Erro ao realizar o login");
      }
      setTimeout(() => setMessage(""), 3000);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <LoginForm onLogin={handleLogin} message={message} />
    </div>
  );
}

export default Login;
