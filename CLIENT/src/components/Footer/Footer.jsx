import React from "react";
// import second from 'sass'
import "./Footer.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__redes">
        <ul className="footer__redes-wrapper">
          <li>
            <a href="#" className="footer__link">
              <i className="fab fa-facebook-f"></i>
              facebook
            </a>
          </li>
          <li>
            <a href="#" className="footer__link">
              <i className="fab fa-twitter"></i>
              twitter
            </a>
          </li>
          <li>
            <a href="#" className="footer__link">
              <i className="fab fa-instagram"></i>
              instagram
            </a>
          </li>
          <li>
            <a href="#" className="footer__link">
              <i className="fab fa-youtube"></i>
              youtube
            </a>
          </li>
        </ul>
      </div>
      <div className="separador"></div>
      <p className="footer__texto">Copyright @ 2022</p>
    </footer>
  );
};

export default Footer;
