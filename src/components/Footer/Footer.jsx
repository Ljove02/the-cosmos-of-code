import React from 'react';
import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear(); // Dinamičko dobijanje godine

  return (
    <footer className="footer-container">
      <p className="footer-text">
        Built with heart, coffee, and a bit of chaos :')
      </p>
      <p className="footer-copyright">
        © Veljko Spasić {currentYear}
      </p>
    </footer>
  );
}

export default Footer;
