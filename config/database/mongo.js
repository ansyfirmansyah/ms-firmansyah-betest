require('dotenv').config();
const mongoose = require('mongoose');

// URL Mongo DB
const mongoURI = `${process.env.DB_URL}`;

// Buka koneksi ke Mongo DB
mongoose.connect(mongoURI, { dbName: 'db_firmansyah_betest' })
  .then(() => {
    console.log('Koneksi MongoDB berhasil.');
  })
  .catch(err => {
    console.error('Koneksi MongoDB gagal:', err);
  });

module.exports = mongoose;