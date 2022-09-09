import React from "react";
import shared from './style/shared.css'

const Footer = () => {
  return (
    <footer className="footer">
      <h3 className="footer__title">© Miguel Muñiz 2022</h3>
      <div className="footer__links">
        <a
          href="https://github.com/MiguelMunizJR/e-commerce"
          target="_blank"
        >
          <i className="fa-brands fa-github footer__link"></i>
        </a>
        <a
          href="https://www.linkedin.com/in/miguel-mu%C3%B1iz-ba%C3%B1uelos-3a8a3a240/"
          target="_blank"
        >
          <i className="fa-brands fa-linkedin-in footer__link"></i>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
