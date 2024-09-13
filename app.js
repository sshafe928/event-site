const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const PORT = 5000;

// Read and parse JSON data
let jsonData;
    const eventData = fs.readFileSync(path.join(__dirname, 'data', 'events.json'), 'utf8');
    jsonData = JSON.parse(eventData);


app.use('/public', express.static(path.join(__dirname, 'public')));

// Set up EJS
app.set('view engine', 'ejs');

// Route for the home page
app.get('/', (req, res) => {
    res.render('pages/events', {
        events: jsonData
    });
});

// Route for the register page
app.get('/register', (req, res) => {
    res.render('pages/register', {
        events: jsonData
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});