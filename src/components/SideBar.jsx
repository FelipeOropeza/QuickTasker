import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function SideBar() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="w-60 bg-gray-800 text-white p-4">
      <ul className="space-y-4">
        <li>
          <a href="#" className="hover:bg-gray-600 p-2 rounded-md block">
            Tarefas
          </a>
        </li>
        <li>
          <button
            onClick={handleLogout}
            className="hover:bg-gray-600 p-2 rounded-md block w-full text-left"
          >
            Sair
          </button>
        </li>
      </ul>
    </div>
  );
}

export default SideBar;
