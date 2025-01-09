import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CadastroForm from "../components/CadastroForm";
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

function Cadastro() {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleCadastro = async (userData) => {
    try {
      const response = await axios.post(
        `${apiUrl}/users`,
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        setMessage("Cadastro realizado com sucesso");
        setTimeout(() => {
          setMessage("");
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setMessage(error.response.data.message);
      } else {
        setMessage("Erro ao realizar o cadastro");
      }
      setTimeout(() => setMessage(""), 3000);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <CadastroForm onCadastro={handleCadastro} message={message} />
    </div>
  );
}

export default Cadastro;