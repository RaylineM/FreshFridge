import React, { useState } from 'react';
import './Cadastro.css';
import ModalNotificacao from '../../componentes/modal/ModalNotificacao';
import axios from 'axios';
import Header from '../../componentes/header/Header';
import Footer from '../../componentes/footer/Footer';

const Cadastro = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');


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
  
    if (!username || !email || !password || !confirmPassword) {
      openModal('Preencha todos os campos obrigatórios');
      return;
    }
  
    if (password !== confirmPassword) {
      openModal('Senha e confirmação de senha não coincidem');
      return;
    }
  
    axios.post('http://localhost:3001/signup', { username, email, password, confirmPassword })
      .then(response => {
        console.log(response.data);
        openModal('Cadastro realizado com sucesso!');

        setTimeout(() => {
          window.location.href = '/login';
        }, 2000); 
      })
      .catch(error => {
        console.error('Erro:', error);
        openModal('Erro ao processar o cadastro');
      });
  };
  

  return (
    <>
    <Header/>
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Nome de Usuário:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        <label>
          Confirmar Senha:
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Cadastro</button>
      </form>
      <ModalNotificacao isOpen={modalIsOpen} message={modalMessage} onRequestClose={closeModal} />
    </div>
    <Footer/>
    </>
  );
};

export default Cadastro;
