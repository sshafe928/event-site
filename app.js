const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser'); // Add body-parser for POST requests
const app = express();
const PORT = 5000;

// Read and parse JSON data
let jsonData;
const eventData = fs.readFileSync(path.join(__dirname, 'data', 'events.json'), 'utf8');
jsonData = JSON.parse(eventData);

const ADMIN = {
    username: 'admin_man',
    password: 'givemeinfo'
};

// Global variable for admin status
let Adminstatus = false;

app.use(bodyParser.urlencoded({ extended: true })); 
app.use('/public', express.static(path.join(__dirname, 'public')));

// Set up EJS
app.set('view engine', 'ejs');

// Route for the home page
app.get('/', (req, res) => {
    res.render('pages/events', {
        events: jsonData,
        isAdmin: Adminstatus 
    });
});

// Route for admin login page
app.get('/admin', (req, res) => {
    res.render('pages/admin');
});

// Handle admin login
app.post('/admin', (req, res) => {
    const { username, password } = req.body;

    if (username === ADMIN.username && password === ADMIN.password) {
        Adminstatus = true;
        res.redirect('/events');
    } else { 
        res.send('Invalid credentials');
    }
});

// Render events page
app.get('/events', (req, res) => {
    res.render('pages/events', { isAdmin: Adminstatus, events: jsonData });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});