// Import Dependency
require('dotenv').config();
const mongoose = require('mongoose');

// Create variable
const mongoURI = `${process.env.DB_URL}`;

// Open connection
mongoose.connect(mongoURI)
  .then(() => {
    console.log('Koneksi MongoDB berhasil!');
  })
  .catch(err => {
    console.error('Koneksi MongoDB gagal:', err);
  });

module.exports = mongoose;