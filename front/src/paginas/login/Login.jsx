import React, { useState } from 'react';
import './Login.css';
import ModalNotificacao from '../../componentes/modal/ModalNotificacao';
import axios from 'axios';
import Header from '../../componentes/header/Header';
import Footer from '../../componentes/footer/Footer';
import Dashboard from '../dasboard/Dashboard';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const openModal = (message) => {
    setModalIsOpen(true);
    setModalMessage(message);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setModalMessage('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !password) {
      openModal('Preencha todos os campos obrigatórios');
      return;
    }

    axios.post('http://localhost:3001/login', { nome: username, senha: password })
    .then(res => {
      if (res.data.auth) {
        localStorage.setItem('token', res.data.token);
        setIsLoggedIn(true);
      } else {
        openModal('Credenciais inválidas');
      }
    })
    .catch(error => {
      console.error('Erro:', error);
      openModal('Ocorreu um erro ao processar a solicitação');
    });
};

  return (
    <>
      {isLoggedIn ? <Dashboard /> : (
        <>
          <Header />
          <div>
            <form onSubmit={handleSubmit}>
              <label>
                Usuário ou Email:
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </label>
              <br />
              <label>
                Senha:
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
              <br />
              <button type="submit">Login</button>
            </form>
            <ModalNotificacao isOpen={modalIsOpen} message={modalMessage} onRequestClose={closeModal} />
          </div>
          <Footer />
        </>
      )}
    </>
  );
};

export default Login;
