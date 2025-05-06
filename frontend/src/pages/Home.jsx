import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import colors from '../constants/color';
import { motion } from 'framer-motion';

function Home() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/reviews');
        const data = await response.json();
        setReviews(data);
      } catch (err) {
        console.log('Erreur:', err);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div>
      <motion.section
        className="py-5 text-center"
        style={{backgroundColor: colors.black, color: colors.white }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="container">
          <motion.h1
            className="display-4 fw-bold mb-3"
            style={{ fontSize: '3.5rem', fontWeight: '700', color: colors.orangeLight }}
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            transition={{ duration: 1 }}
          >
            Développez votre présence web avec LetCookYourWeb
          </motion.h1>
          <motion.p
            className="lead mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            Nous créons des sites et applications web sur mesure, adaptés à vos besoins.
          </motion.p>
          <div className="d-flex justify-content-center flex-wrap">
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
              className="mx-2"
            >
              <Link to="/contact" className="btn btn-light btn-lg px-5 py-3">
                Contactez-nous
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.section>
      <motion.section
        className="bg-light py-4 text-center"
        style={{backgroundColor: colors.black, color: colors.black }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="container">
          <motion.h2
            className="mb-4"
            style={{ color: colors.orangeLight, fontSize: '2.5rem' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 1 }}
          >
            Nos Services
            <p className="lead mb-5" style={{color: colors.black, padding: 20}}>
              Découvrez nos prestations pour vous aider à réussir en ligne.
            </p>
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
              className="mx-2"
            >
              <Link to="/services" className="btn btn-dark btn-lg px-5 py-3" style={{color: colors.white}}>
                Nos Services
              </Link>
            </motion.div>
          </motion.h2>
        </div>
      </motion.section>
      <div className="bg-light text-center">
        <hr className="custom-hr" />
      </div>
      <motion.section
        className="bg-light py-5 text-center"
        id="testimonials"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <div className="container">
          <motion.h2
            className="mb-4"
            style={{ color: colors.orangeLight }}
          >
            Ce que nos clients en disent
          </motion.h2>
          <div className="row">
            {reviews.slice(0, 3).map((review) => (
              <motion.div
                key={review._id}
                className="col-md-4 mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 1 }}
              >
                <div
                  className="blockquote-footer p-4 bg-white shadow rounded-lg"
                  style={{
                    height: '120px',
                    overflow: 'hidden',
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <p className="font-italic" style={{ fontSize: '1rem' }}>
                    "{review.text}"
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
      <motion.section
        className="text-white text-center py-5"
        style={{ backgroundColor: colors.orangeLight }}
        id="cta"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="container">
          <h2 style={{ fontSize: '2.5rem' }}>Prêt à commencer votre projet ?</h2>
          <p className="lead mb-4">Contactez-nous pour discuter de vos besoins et obtenir un devis personnalisé.</p>
          <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.3 }}>
            <Link to="/contact" className="btn btn-outline-light btn-lg px-5 py-3">Contactez-nous</Link>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}

export default Home;
