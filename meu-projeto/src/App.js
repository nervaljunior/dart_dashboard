import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Projetos from './component/projetos/projetos';
import Login from './component/login/Login';
import CadastroUsuario from './component/cadastro/cadastro';
import Dashboard from './component/dashboard/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/projetos" element={<Projetos />} />
        <Route path="/cadastro" element={<CadastroUsuario />} />
        <Route path="/dashboard/:id" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
