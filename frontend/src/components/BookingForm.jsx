import React, { useState, useEffect } from 'react';
import './BookingForm.css';

function BookingForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState('');
  const [appointments, setAppointments] = useState([]); // Liste des rendez-vous existants
  const [weekStartDate, setWeekStartDate] = useState(new Date()); // Date du début de la semaine
  const [selectedTime, setSelectedTime] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/appointments');
        const data = await response.json();
        setAppointments(data);
      } catch (err) {
        console.log('Erreur lors de la récupération des rendez-vous:', err);
      }
    };
    fetchAppointments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const appointment = {
      name,
      email,
      service,
      date: weekStartDate,
      time: selectedTime,
    };
  
    try {
      const response = await fetch('http://localhost:5000/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointment),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Rendez-vous enregistré:', data);
      } else {
        console.error('Erreur lors de l\'enregistrement du rendez-vous');
      }
    } catch (err) {
      console.log('Erreur de connexion au serveur:', err);
    }
  };

  const navigateWeek = (direction) => {
    const newDate = new Date(weekStartDate);
    newDate.setDate(newDate.getDate() + direction * 7); // Avance ou recule de 7 jours
    setWeekStartDate(newDate);
  };

  // Vérifier la disponibilité d'un créneau horaire
  const isTimeAvailable = (date, time) => {
    const datetime = new Date(`${date}T${time}`);
    return !appointments.some((appointment) => new Date(appointment.datetime).getTime() === datetime.getTime());
  };

  // Sélectionner un créneau horaire
  const handleTimeSelection = (time) => {
    setSelectedTime(time);
  };

  // Formater la date du début de la semaine pour l'affichage
  const formatWeekStartDate = () => {
    const day = weekStartDate.getDate();
    const month = weekStartDate.getMonth() + 1;
    const year = weekStartDate.getFullYear();
    return `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${year}`;
  };

  // Filtrer les créneaux horaires
  const filterTimeSlots = (timeSlots) => {
    return timeSlots.filter(time => {
      // Exclure les créneaux entre 12h et 14h
      const hour = parseInt(time.split(':')[0]);
      if (hour >= 12 && hour < 14) return false;
      
      // Vérifier si le créneau est réservé
      const selectedDateString = weekStartDate.toLocaleDateString();
      return isTimeAvailable(selectedDateString, time);
    });
  };

  const renderCalendar = () => {
    const startTime = 9;
    const endTime = 18;
    const timeSlots = [];

    for (let hour = startTime; hour < endTime; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        timeSlots.push(time);
      }
    }

    const weekDays = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven'];
    const weekDates = [];

    // Calculer les dates pour chaque jour de la semaine
    for (let i = 0; i < 5; i++) {
      const day = new Date(weekStartDate);
      day.setDate(weekStartDate.getDate() + i);
      weekDates.push(day);
    }

    return (
      <div className="calendar">
        <div className="calendar-header">
          <button onClick={() => navigateWeek(-1)} className="arrow-button">{'<'}</button>
          <div className="week-title">{formatWeekStartDate()}</div>
          <button onClick={() => navigateWeek(1)} className="arrow-button">{'>'}</button>
        </div>

        <div className="calendar-body">
          {weekDays.map((_, dayIndex) => (
            <div key={dayIndex} className="day-column">
              <div className="day-header">{weekDates[dayIndex].toLocaleDateString()}</div>
              {filterTimeSlots(timeSlots).map((time, index) => {
                const isBooked = !isTimeAvailable(weekDates[dayIndex].toLocaleDateString(), time);
                return (
                  <button
                    key={index}
                    className={`time-slot ${isBooked ? 'booked' : ''} ${selectedTime === time ? 'selected' : ''}`}
                    disabled={isBooked}
                    onClick={() => handleTimeSelection(time)}
                  >
                    {time}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">Prendre un rendez-vous</h2>
      <form onSubmit={handleSubmit} className="booking-form mx-auto" style={{ maxWidth: '800px' }}>
        <div className="form-group mb-3">
          <label htmlFor="name" className="form-label">Nom</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="service" className="form-label">Service</label>
          <select
            className="form-select"
            id="service"
            value={service}
            onChange={(e) => setService(e.target.value)}
            required
          >
            <option value="">Choisir un service</option>
            <option value="Consultation">Consultation</option>
            <option value="Formation">Formation</option>
            <option value="Atelier">Atelier</option>
          </select>
        </div>

        <div className="form-group mb-3">
          <label htmlFor="time" className="form-label">Sélectionner une plage horaire</label>
          {renderCalendar()}
        </div>

        <button type="submit" className="btn btn-primary w-100" disabled={!selectedTime}>
          Réserver
        </button>
      </form>
    </div>
  );
}

export default BookingForm;
