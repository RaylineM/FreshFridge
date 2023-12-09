import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import HeaderDasboard from '../../componentes/header_dashboard/header_dashboard';
import Footer from '../../componentes/footer/Footer';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import TokenExpiredModal from '../../componentes/modal_token/TokenExpiredModal';

function Dashboard() {
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
      <div className="home-wrapper">
        <div className="green-section">
          <div className="text-container">
            <h1 className="titulo">Saiba como conservar seus alimentos</h1>
            <p className="subtitulo">
              O desperdício de alimentos é um grande problema,
              afetando tanto a comida que chega à mesa quanto o meio ambiente.
              Isso vai contra os Objetivos de Desenvolvimento Sustentável da ONU.
              Todos os dias, toneladas de comida são jogadas fora,
              enquanto muitas pessoas ainda passam fome e os recursos naturais se tornam escassos.
            </p>
          </div>
          <img src="/imagens/food-pana.svg" alt="Image 2" className="right-image" />
        </div>
        <div className="green-section">
          <div className="text-container">
            <h2 className='titulo'>FreshFridge</h2>
            <p className="subtitulo">
              Nosso sistema utiliza inteligência artificial para resolver esse problema.
              Ele permite que você tire dúvidas e fornece dicas simples sobre como armazená-los corretamente.
              Isso ajuda a evitar o desperdício de comida,
              ajudando o meio ambiente e seguindo os Objetivos de Desenvolvimento Sustentável da ONU.
            </p>
          </div>
          <img src="/imagens/food-bro.svg" alt="Image 4" className="left-image" />
        </div>
        <div className="white-section">
          <div className="text-container">
            <h2 className="titulo-terceiro">Como usar</h2>
            <p className='subtitulo-terceiro'>
              Usar o FreshFridge é fácil e vantajoso.
              Basta buscar a forma de armazenamento de um determinado alimento no chat,
              e em segundos, você receberá orientações claras sobre como conservá-lo corretamente.
            </p>
          </div>
          <img src="/imagens/post-bro.svg" alt="Image 5" className="left-image" />
        </div>
        <div className="green-section">
          <div className="text-container">
            <h2 className="titulo">Vantagens</h2>
            <p className="subtitulo">
              Ao adotar nosso sistema, você dá um passo em direção a um mundo mais sustentável.
              Isso ajuda a combater o desperdício de alimentos,
              contribuindo para o objetivo da ONU de acabar com a fome.
              Além disso, promove a utilização responsável dos recursos naturais e reduz o impacto no meio ambiente.
              Cada ação conta para um planeta mais equilibrado e menos fome no mundo.
            </p>
          </div>
          <img src="/imagens/food.svg" alt="Image 7" className="right-image" />
        </div>
      </div>
      <Footer />
      {showModal && (
        <TokenExpiredModal closeModal={closeModal} redirect={redirect} />
      )}
    </>
  );
}

export default Dashboard;