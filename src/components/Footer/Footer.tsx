import React from 'react';
import { Container } from 'react-bootstrap';
import "./Footer.css";

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark text-white text-center py-3 footer">
      <Container>
        <p className='copy-right'>&copy; 2025 Atalar Yazılım & Tasarım. Tüm Hakları Saklıdır.</p>
      </Container>
    </footer>
  );
};

export default Footer;