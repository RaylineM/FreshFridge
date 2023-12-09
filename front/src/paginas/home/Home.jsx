import React from 'react';
import './Home.css';
import Header from '../../componentes/header/Header';
import Footer from '../../componentes/footer/Footer';


function Home() {
  return (
    <>
    <Header/>
    <div className="home-wrapper">
      <div className="green-section">
        <div className="text-container">
          <h1 className="titulo">Saiba como conservar seus alimentos</h1>
          <p className="subtitulo">
            O desperdício de alimentos é um grande problema, afetando tanto a
            comida que chega à mesa quanto o meio ambiente. Isso vai contra os
            Objetivos de Desenvolvimento Sustentável da ONU. Todos os dias, toneladas
            de comida são jogadas fora, enquanto muitas pessoas ainda passam fome e os
            recursos naturais se tornam escassos.
          </p>
        </div>
        <img src="/imagens/food-pana.svg" alt="Image 2" className="right-image" />
      </div>
      <div className="green-section">
        <div className="text-container">
          <h2 className='titulo'>FreshFridge</h2>
          <p className="subtitulo">Nosso sistema utiliza inteligência artificial para resolver esse problema.
            Ele permite que você envie fotos dos alimentos, e em seguida, fornece dicas simples sobre como armazená-los corretamente. Isso ajuda a evitar o desperdício de comida, ajudando o meio ambiente e seguindo os Objetivos de Desenvolvimento Sustentável da ONU.
          </p>
        </div>
        <img src="/imagens/food-bro.svg" alt="Image 4" className="left-image" />
      </div>
      <div className="white-section">
        <div className="text-container">
          <h2 className="titulo-terceiro">Como usar</h2>
          <p className='subtitulo-terceiro'>Usar o FreshFridge é fácil e vantajoso. Basta carregar uma foto do alimento no chat, e em segundos, você receberá orientações claras sobre como conservá-lo corretamente.
          </p>
        </div>
        <img src="/imagens/post-bro.svg" alt="Image 5" className="left-image" />
      </div>
      <div className="green-section">
        <div className="text-container">
          <h2 className="titulo">Vantagens</h2>
          <p className="subtitulo">Ao adotar nosso sistema, você dá um passo em direção a um mundo mais sustentável. Isso ajuda a combater o desperdício de alimentos, contribuindo para o objetivo da ONU de acabar com a fome. Além disso, promove a utilização responsável dos recursos naturais e reduz o impacto no meio ambiente. Cada ação conta para um planeta mais equilibrado e menos fome no mundo.
          </p>
        </div>
        <img src="/imagens/food.svg" alt="Image 7" className="right-image" />
      </div>
    </div>
    <Footer/>
    </>
  );
}

export default Home;
