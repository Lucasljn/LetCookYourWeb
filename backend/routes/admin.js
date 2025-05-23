const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const admin = await Admin.findOne({ username });
  if (!admin || !(await admin.comparePassword(password)))
    return res.status(401).json({ message: 'Identifiants invalides' });

  const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });

  res.json({ token });
});

module.exports = router;
