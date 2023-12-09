import React from 'react';
import { Link } from 'react-router-dom';
import './header_dashboard.css';

function HeaderDasboard() {
  return (
    <div className="header">
      <div className="header-container">
        <h1 className="h1">FreshFridge</h1>
        <nav className="nav">
          <ul>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/receitas">Receitas</Link>
            </li>
            <li>
              <Link to="/fac">Chat</Link>
            </li>
            <li>
              <Link to="/">Sair</Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default HeaderDasboard;
