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
    <div className="bg-gray-800 text-white p-4 w-60 sm:w-48 xs:w-40">
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
