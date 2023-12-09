import React, { useEffect, useState } from 'react';
import './Fac.css';
import App from '../../componentes/Chat';
import HeaderDasboard from '../../componentes/header_dashboard/header_dashboard';
import Footer from '../../componentes/footer/Footer';
import TokenExpiredModal from '../../componentes/modal_token/TokenExpiredModal';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Fac() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    const token = localStorage.getItem('token');
    axios
      .get('http://localhost:3001/user-info', {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.error('Erro:', error);
        if (error.response.status === 401) {
          console.log('Redirecionando para a página inicial...');
          setShowModal(true);
        }
      });
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const redirect = () => {
    navigate('/');
  };

  return (
    <>
      <HeaderDasboard />
      <div className="page-container">
        <div className="content-container">
          <div className="left-container">
            <p className="information-message">
              Tire sua dúvida sobre armazenamento correto de alimentos no chat. É fácil!
            </p>
            <div className="image-container">
              <img src="imagens/eating a variety of foods-bro.svg" alt="Imagem Ilustrativa" style={{ maxWidth: '100%' }} />
            </div>
          </div>
          <div className="chat-container">
            <App />
          </div>
        </div>
      </div>
      <Footer />
      {showModal && (
        <TokenExpiredModal closeModal={closeModal} redirect={redirect} />
      )}
    </>
  );
}

export default Fac;
