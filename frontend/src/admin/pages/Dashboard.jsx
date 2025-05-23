import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [commandes, setCommandes] = useState([]);

  const token = localStorage.getItem('token');

  const deleteAppointment = (id) => {
    axios.delete(`http://localhost:5000/api/admin/appointments/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(() => {
      setAppointments(prev => prev.filter(a => a._id !== id));
    })
    .catch(err => console.error('Erreur suppression RDV:', err));
  };
  
  const deleteCommande = (id) => {
    axios.delete(`http://localhost:5000/api/admin/commandes/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(() => {
      setCommandes(prev => prev.filter(c => c._id !== id));
    })
    .catch(err => console.error('Erreur suppression commande:', err));
  };

  useEffect(() => {
    if (!token) {
      navigate('/admin/login');
      return;
    }

    axios.get('http://localhost:5000/api/appointments', {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(res => setAppointments(res.data))
    .catch(err => {
      console.error('Erreur rendez-vous:', err.response?.data || err.message);
    });
  
    axios.get('http://localhost:5000/api/admin/commandes', {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(res => setCommandes(res.data))
    .catch(err => {
      console.error('Erreur commandes:', err.response?.data || err.message);
      localStorage.removeItem('token');
      navigate('/admin/login');
    });
  }, [navigate, token]);

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/admin/login');
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Dashboard Admin</h2>
        <button className="btn btn-danger" onClick={logout}>Se déconnecter</button>
      </div>

      <h4 className="mt-4">Rendez-vous</h4>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Nom</th><th>Email</th><th>Service</th><th>Date</th><th>Heure</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((a, i) => (
            <tr key={i}>
                <td>{a.name}</td>
                <td>{a.email}</td>
                <td>{a.service}</td>
                <td>{new Date(a.date).toLocaleDateString()}</td>
                <td>{a.time}</td>
                <td>
                    <button
                    className="btn btn-sm btn-danger"
                    onClick={() => deleteAppointment(a._id)}
                    >
                    Supprimer
                    </button>
                </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h4 className="mt-5">Commandes</h4>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Nom</th><th>Email</th><th>Site</th><th>Prix</th><th>Description</th>
          </tr>
        </thead>
        <tbody>
          {commandes.map((c, i) => (
            <tr key={i}>
                <td>{c.name}</td>
                <td>{c.email}</td>
                <td>{c.site}</td>
                <td>{c.price}€</td>
                <td>{c.description}</td>
                <td>
                    <button
                    className="btn btn-sm btn-danger"
                    onClick={() => deleteCommande(c._id)}
                    >
                    Supprimer
                    </button>
                </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
