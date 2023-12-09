import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import Home from './paginas/home/Home';
import Fac from './paginas/fac/Fac';
import Receitas from './componentes/receitas/ListaReceitas';
import Login from './paginas/login/Login';
import Cadastro from './paginas/cadastro/Cadastro';
import Dashboard from './paginas/dasboard/Dashboard';


const AppWrapper = styled.div`
  font-family: Arial, sans-serif;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

function App() {
  return (
    <Router>
      <AppWrapper>
        <Routes>
          <Route path="/receitas" element={<Receitas />} />
          <Route path="/fac" element={<Fac/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/" element={<Home />} />
          <Route path="/cadastro" element={<Cadastro/>} />
        </Routes>
      </AppWrapper>
    </Router>
  );
}

export default App;