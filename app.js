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


app.post('/events', (req, res) => {
    const data = req.body;
    const filePath = path.join(__dirname, 'events.json');

    fs.readFile(filePath, 'utf8', (err, fileData) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Error reading file' });
        }

        let jsonData = [];

        try {
            jsonData = JSON.parse(fileData);
        } catch (e) {
            return res.status(500).json({ success: false, message: 'Error parsing JSON' });
        }

        // Find the event to update
        const event = jsonData.find(e => e.name === data.eventName);
        if (event) {
            // Add new attendee
            if (data.attendee && data.attendee.name && data.attendee.email) {
                event.attendees.push(data.attendee);
            } else {
                return res.status(400).json({ success: false, message: 'Invalid attendee data' });
            }
        } else {
            return res.status(404).json({ success: false, message: 'Event not found' });
        }

        // Write updated data back to file
        fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), 'utf8', (err) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Error writing file' });
            }

            res.json({ success: true });
        });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});