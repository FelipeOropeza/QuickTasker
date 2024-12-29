import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CadastroForm from "../components/CadastroForm";

import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

function Cadastro() {
  const [message, setMessage] = useState("");
  console.log(apiUrl);
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

      if (response.status === 200) {
        setMessage("Cadastro realizado com sucesso");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        setMessage("Erro ao realizar o cadastro");
      }
    } catch (error) {
      setMessage("Erro ao realizar o cadastro");
    }
  };

  return (
    <div>
      {message && <p className="text-center text-red-500">{message}</p>}
      <CadastroForm onCadastro={handleCadastro} />
    </div>
  );
}

export default Cadastro;
