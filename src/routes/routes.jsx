import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from '../App.jsx';
import Login from '../pages/Login.jsx';
import Cadastro from '../pages/Cadastro.jsx';
import Home from '../pages/Home.jsx';
import PageTitle from '../utils/PageTitle.jsx';

function AppRoutes() {
  return (
    <Router>
      <PageTitle />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} /> 
        <Route path="*" element={<App />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;