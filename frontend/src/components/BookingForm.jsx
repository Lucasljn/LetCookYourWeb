import React, { useState, useEffect } from 'react';
import './BookingForm.css';
import colors from '../constants/color';

function BookingForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState('');
  const [appointments, setAppointments] = useState([]);
  const [weekStartDate, setWeekStartDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [site, setSite] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

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
      date: new Date(selectedDate),
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
        setConfirmationMessage(`Votre rendez-vous a bien été pris le ${selectedDate} à ${selectedTime}.`);
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } else {
        setConfirmationMessage('Une erreur est survenue. Veuillez réessayer.');
      }
    } catch (err) {
      setConfirmationMessage('Erreur de connexion au serveur.');
    }
  };
  

  const handleCommandeSubmit = async (e) => {
    e.preventDefault();
    const commande = {
      name,
      email,
      site,
      price,
      description,
    };
  
    try {
      const response = await fetch('http://localhost:5000/api/commandes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(commande),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Commande enregistrée:', data);
        setConfirmationMessage("Votre commande a bien été envoyée !");
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } else {
        setConfirmationMessage("Une erreur est survenue. Veuillez réessayer.");
      }
    } catch (err) {
      setConfirmationMessage("Erreur de connexion au serveur.");
    }
  };
  

  const navigateWeek = (direction) => {
    const newDate = new Date(weekStartDate);
    newDate.setDate(newDate.getDate() + direction * 7);
    setWeekStartDate(newDate);
  };
 
  const isTimeAvailable = (date, time) => {
    const parsedDate = new Date(date);
    if (isNaN(parsedDate)) return false;
    const dateISO = parsedDate.toISOString().split('T')[0];
    return !appointments.some((appointment) => {
      const appointmentDate = new Date(appointment.date);
      if (isNaN(appointmentDate)) return false;
      const appointmentDateISO = appointmentDate.toISOString().split('T')[0];
      return appointmentDateISO === dateISO && appointment.time === time;
    });
  };

  const consultBefore = (email) => {
    return appointments.find((appointment) => appointment.email === email);
  };

  const handleTimeSelection = (time, dayDate) => {
    setSelectedTime(time);
    setSelectedDate(dayDate);
  };

  const renderCalendar = () => {
    const startTime = 9;
    const endTime = 18;
    const timeSlots = [];
    for (let hour = startTime; hour < endTime; hour++) {
      const time = `${hour.toString().padStart(2, '0')}:00`;
      timeSlots.push(time);
    }
  
    const weekDays = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven'];
    const weekDates = [];
    for (let i = 0; i < 5; i++) {
      const day = new Date(weekStartDate);
      day.setDate(weekStartDate.getDate() + i);
      weekDates.push(day);
    }
  
    return (
      <div className="calendar">
        <div className="calendar-header">
          <button type="button" onClick={() => navigateWeek(-1)} className="arrow-button">{'<'}</button>
          <button type="button" onClick={() => navigateWeek(1)} className="arrow-button">{'>'}</button>
        </div>
        <div className="calendar-body">
          {weekDays.map((_, dayIndex) => (
            <div key={dayIndex} className="day-column">
              <div className="day-iter">{weekDays[dayIndex]}</div>
              <div className="day-header">{weekDates[dayIndex].toLocaleDateString()}</div>
              {timeSlots.map((time, index) => {
                const currentDate = weekDates[dayIndex].toISOString();
                const isBooked = !isTimeAvailable(weekDates[dayIndex], time);
                const isSelected = selectedTime === time && selectedDate === currentDate;
                return (
                  <button
                    type="button"
                    key={index}
                    className={`time-slot ${isBooked ? 'booked' : ''} ${isSelected ? 'selected' : ''}`}
                    disabled={isBooked}
                    onClick={() => handleTimeSelection(time, currentDate)}
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
      <h2 className="text-center mb-4">Choisissez un service</h2>
      <form onSubmit={handleSubmit} className="booking-form mx-auto" style={{ maxWidth: '800px' }}>
        {confirmationMessage && (
          <div className="alert alert-success text-center mb-4" role="alert">
            {confirmationMessage}
          </div>
        )}
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
            <option value="Commande">Passer commande</option>
          </select>
        </div>
        {service === "Consultation" && (
          <>
            <div className="form-group mb-3">
              <label htmlFor="time" className="form-label">Sélectionner une plage horaire</label>
              {renderCalendar()}
            </div>
            {confirmationMessage && (
              <div className="alert alert-success text-center mb-4" role="alert">
                {confirmationMessage}
              </div>
            )}
            <button type="submit" className="btn w-100" disabled={!selectedTime} style={{background: colors.blueLight, color: 'white'}}>
              Réserver
            </button>
          </>
        )}
        {service === "Commande" && (
          <>
            {!email ? (
              <div className="alert alert-warning text-center mb-4">
                Veuillez entrer votre email pour vérifier votre consultation.
              </div>
            ) : !consultBefore(email) ? (
              <div className="alert alert-warning text-center mb-4">
                Aucun rendez-vous trouvé pour cet email.  
                Veuillez réserver une <strong>consultation</strong> afin que nous puissions mieux comprendre vos attentes.
              </div>
            ) : (
              <>
                <div className="form-group mb-3">
                  <label htmlFor="site" className="form-label">Nom du site</label>
                  <input
                    type="text"
                    className="form-control"
                    id="site"
                    value={site}
                    onChange={(e) => setSite(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="price" className="form-label">Prix convenu (€)</label>
                  <input
                    type="number"
                    className="form-control"
                    id="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    id="description"
                    rows="4"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  ></textarea>
                </div>
                {confirmationMessage && (
                  <div className="alert alert-success text-center mb-4" role="alert">
                    {confirmationMessage}
                  </div>
                )}
                <button
                  type="button"
                  className="btn w-100"
                  onClick={handleCommandeSubmit}
                  style={{background: colors.blueLight, color: 'white'}}
                  disabled={!site || !price || !description}
                >
                  Envoyer la commande
                </button>
              </>
            )}
          </>
        )}

      </form>
    </div>
  );
}

export default BookingForm;
