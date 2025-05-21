import React from 'react';
import colors from '../constants/color';
import BookingForm from '../components/BookingForm';

function Services() {
  return (
    <div>
      <section className="py-5 text-center" style={{ backgroundColor: colors.black, color: colors.white }}>
        <div className="container">
          <h2 className="mb-4" style={{ color: colors.orangeLight }}>Nos Services</h2>
          <p className="lead mb-5" style={{ color: '#dddddd' }}>
            Découvrez nos prestations pour vous aider à réussir en ligne.
          </p>
          <div className="row justify-content-center">
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="card shadow-lg border-0 rounded-lg overflow-hidden" style={{ backgroundColor: '#1d1d1d' }}>
                <img src="/assets/home/webdesign.png" alt="Web Design" className="card-img-top" />
                <div className="card-body text-white">
                  <h5 className="card-title" style={{ color: colors.orangeLight }}>Consultations</h5>
                  <p className="card-text">
                    Réservez une consultation personnalisée pour discuter de votre prochain projet web.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="card shadow-lg border-0 rounded-lg overflow-hidden" style={{ backgroundColor: '#1d1d1d' }}>
                <img src="/assets/home/seo.png" alt="SEO" className="card-img-top" />
                <div className="card-body text-white">
                  <h5 className="card-title" style={{ color: colors.orangeLight }}>Commandes</h5>
                  <p className="card-text">
                    Passez votre commande avec la plus grande simplicité suite a une consultation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <BookingForm />
    </div>
  );
}

export default Services;
