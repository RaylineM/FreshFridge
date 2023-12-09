import React from 'react';
import './Footer.css'

function Footer() {
  return (
    <footer className='FooterWrapper'>
      <div className='FooterContainer'>
        <p>&copy; {new Date().getFullYear()} FreshFridge</p>
        <div className='SocialLinks'>
          <a href="https://www.instagram.com" target="_blank" rel="noreferrer">
            Instagram
          </a>
          <a href="https://www.github.com" target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
