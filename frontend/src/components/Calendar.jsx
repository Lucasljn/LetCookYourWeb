import React, { useState, useEffect } from 'react';

function Calendar() {
  const [appointments, setAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/appointments');
        const data = await response.json();
        setAppointments(data);
      } catch (err) {
        console.error('Erreur lors de la récupération des rendez-vous:', err);
      }
    };
    fetchAppointments();
  }, []);

  const checkAvailability = async (datetime) => {
    try {
      const response = await fetch(`http://localhost:5000/api/appointments/check?datetime=${datetime}`);
      if (response.status === 409) {
        return false;
      }
      return true;
    } catch (err) {
      console.error('Erreur lors de la vérification de la disponibilité:', err);
      return false;
    }
  };

  const handleSelectTime = async (day, hour) => {
    const datetime = new Date(`${day} ${hour}`);
    const isAvailable = await checkAvailability(datetime);

    if (isAvailable) {
      setSelectedDate(day);
      setSelectedTime(hour);
      console.log(`Rendez-vous sélectionné pour ${datetime}`);
    } else {
      alert('Ce créneau est déjà réservé');
    }
  };

  const renderCalendar = () => {
    const daysOfWeek = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
    const hours = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00'];

    return daysOfWeek.map((day) => (
      <div key={day} className="calendar-day">
        <h4>{day}</h4>
        {hours.map((hour) => {
          const datetime = new Date(`${day} ${hour}`);
          const isBooked = appointments.some((appointment) => new Date(appointment.datetime).getTime() === datetime.getTime());
          return (
            <button
              key={hour}
              onClick={() => handleSelectTime(day, hour)}
              disabled={isBooked}
              style={{ backgroundColor: isBooked ? '#ccc' : '#5D98D5' }}
            >
              {hour}
            </button>
          );
        })}
      </div>
    ));
  };

  return (
    <div>
      <h2>Calendrier des Rendez-vous</h2>
      {renderCalendar()}
      {selectedDate && selectedTime && (
        <div>
          <p>Rendez-vous sélectionné pour : {selectedDate} à {selectedTime}</p>
        </div>
      )}
    </div>
  );
}

export default Calendar;
