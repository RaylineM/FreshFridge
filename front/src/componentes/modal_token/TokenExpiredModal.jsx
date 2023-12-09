import React from 'react';
import './TokenExpiredModal.css';

function TokenExpiredModal({ closeModal, redirect }) {
  return (
    <div className="modal-overlay">
      <div className="token-expired-modal">
        <p>Sua sessão expirou.</p>
        <p>Por favor, faça login novamente.</p>
        <button onClick={() => { closeModal(); redirect(); }}>OK</button>
      </div>
    </div>
  );
}

export default TokenExpiredModal;

