import React from 'react';
import Modal from 'react-modal';

const ModalNotificacao = ({ isOpen, message, onRequestClose }) => {
  const customStyles = {
    content: {
      width: '300px', 
      height: '100px', 
      margin: 'auto', 
    },
  };

  const buttonStyle = {
    marginTop: '30px', 
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Notificação"
      style={customStyles} 
    >
      <div>
        <p>{message}</p>
        <button style={buttonStyle} onClick={onRequestClose}>
          Fechar
        </button>
      </div>
    </Modal>
  );
};

export default ModalNotificacao;
