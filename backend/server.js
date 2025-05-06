const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/letcookyourweb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connecté'))
.catch((err) => console.log('Erreur de connexion à MongoDB', err));

const appointmentSchema = new mongoose.Schema({
  name: String,
  email: String,
  service: String,
  datetime: Date,
});
const Appointment = mongoose.model('Appointment', appointmentSchema);

app.get('/api/appointments', async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/appointments', async (req, res) => {
  const {name, email, service, datetime} = req.body;
  const newAppointment = new Appointment({name, email, service, datetime});
  try {
    await newAppointment.save();
    res.status(201).json(newAppointment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get('/api/appointments/check', async (req, res) => {
  const { datetime } = req.query;
  try {
    const existingAppointment = await Appointment.findOne({ datetime });
    if (existingAppointment) {
      return res.status(409).json({ message: 'Ce créneau est déjà réservé' });
    }
    return res.status(200).json({ message: 'Créneau disponible' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


const reviewSchema = new mongoose.Schema({
  name: String,
  text: String,
  date: { type: Date, default: Date.now },
});
const Review = mongoose.model('Review', reviewSchema);

app.get('/api/reviews', async (req, res) => {
  try {
    const reviews = await Review.find().limit(3);
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/reviews', async (req, res) => {
  const { name, text } = req.body;
  const newReview = new Review({ name, text });
  try {
    await newReview.save();
    res.status(201).json(newReview);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const port = 5000;
app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});
