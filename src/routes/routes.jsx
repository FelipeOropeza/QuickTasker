import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "../App.jsx";
import Login from "../pages/Login.jsx";
import Cadastro from "../pages/Cadastro.jsx";
import Home from "../pages/Home.jsx";
import PageTitle from "../utils/PageTitle.jsx";

import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {
  return (
    <Router>
      <PageTitle />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="*" element={<App />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
