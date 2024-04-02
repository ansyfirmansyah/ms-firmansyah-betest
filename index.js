// Import Dependency
require('dotenv').config();
const express = require('express');

// Create variable
const app = express();
const port = process.env.PORT; // port aplikasi, nantinya akan pakai env

// Tes endpoint
app.get('/', (req, res) => {
    res.send('Test endpoint');
})

// Start server
app.listen(port, () => {
    console.log(`Start di port ${port}`);
})