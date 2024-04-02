// Import Dependency
const express = require('express');

// Create variable
const app = express();
const port = 3000; // port aplikasi, nantinya akan pakai env

// Tes endpoint
app.get('/', (req, res) => {
    res.send('Test endpoint');
})

// Start server
app.listen(port, () => {
    console.log(`Start di port ${port}`);
})