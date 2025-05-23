import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminIndex() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      navigate('/admin/dashboard');
    } else {
      navigate('/admin/login');
    }
  }, [navigate]);

  return null;
}
