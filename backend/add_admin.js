const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Admin = require('./models/Admin');

mongoose.connect('mongodb://localhost:27017/letcookyourweb');

(async () => {
  const hashed = await bcrypt.hash('admin123', 10);
  await Admin.create({ username: 'admin', password: hashed });
  console.log('Admin ajouté');
  process.exit();
})();
