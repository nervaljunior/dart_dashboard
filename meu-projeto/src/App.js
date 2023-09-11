import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Projetos from './component/projetos/projetos';
import Login from './component/login/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/projetos" element={<Projetos />} />
      </Routes>
    </Router>
  );
}

export default App;
