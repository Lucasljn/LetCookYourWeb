import React from 'react';
import colors from '../constants/color';
import './Footer.css';

function Footer() {
  return (
    <footer style={{ backgroundColor: colors.black, color: colors.white, paddingTop: '30px', paddingBottom: '30px' }}>
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-md-12 mb-4 mb-md-0">
            <h5 className="text-uppercase" style={{ color: colors.orangeLight, fontWeight: '700', fontSize: '1.2rem' }}>LetCookYourWeb</h5>
            <p className="footer-description">
              Développement de sites web sur mesure et solutions digitales adaptées à vos besoins.
            </p>
          </div>

          <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase" style={{ color: colors.orangeLight, fontSize: '1.1rem', fontWeight: '600' }}>Liens rapides</h5>
            <ul className="list-unstyled footer-links">
              <li><a href="/" className="footer-link">Accueil</a></li>
              <li><a href="/services" className="footer-link">Services</a></li>
              <li><a href="/portfolio" className="footer-link">Portfolio</a></li>
              <li><a href="/contact" className="footer-link">Contact</a></li>
            </ul>
          </div>

          <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase" style={{ color: colors.orangeLight, fontSize: '1.1rem', fontWeight: '600' }}>Contact</h5>
            <ul className="list-unstyled footer-links">
              <li><a href="mailto:letcookyourweb@gmail.com" className="footer-link">letcookyourweb@gmail.com</a></li>
              <li><a href="tel:+33769071674" className="footer-link">+33 7 69 07 16 74</a></li>
              <li>Nice, France</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="text-center p-3" style={{ backgroundColor: colors.white, color: colors.orangeLight, fontSize: '0.9rem', borderTop: `1px solid ${colors.blueLight}` }}>
        © 2025 LetCookYourWeb | Tous droits réservés
      </div>
    </footer>
  );
}

export default Footer;
