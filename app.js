const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 5000;

// Read and parse JSON data
let jsonData;
const eventData = fs.readFileSync(path.join(__dirname, 'data', 'events.json'), 'utf8');
jsonData = JSON.parse(eventData);

const ADMIN = { username: 'admin_man', password: 'givemeinfo'};

// Global variable for admin status
let Adminstatus = false;

app.use(bodyParser.urlencoded({ extended: true })); 
app.use('/public', express.static(path.join(__dirname, 'public')));

// Set up EJS
app.set('view engine', 'ejs');

// Route for the home page
app.get('/', (req, res) => {
    res.render('pages/events', { events: jsonData, isAdmin: Adminstatus });
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
    } else { res.send('Invalid credentials');}
});

// Render events page
app.get('/events', (req, res) => {
    res.render('pages/events', { isAdmin: Adminstatus, events: jsonData });
});


//registering for an event
app.post('/events', (req, res) => {
    if (id ='submit') {
        const { event, name, email } = req.body;
        if (!event || !name || !email) { return res.status(400).json({ success: false, message: 'Missing required fields' });}
        const attendeeData = {
            eventName: event,
            attendee: {
                name,
                email
            }
        };
        const filePath = path.join(__dirname, 'data', 'registration.json');

        fs.readFile(filePath, 'utf8', (err, fileContent) => {
            if (err) { return res.status(500).json({ success: false, message: 'Error reading file' });}

            let jsonData = [];

            jsonData = JSON.parse(fileContent);

            jsonData.push(attendeeData);

            // Write updated data back to file
            fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), 'utf8', (err) => {
                if (err) {return res.status(500).json({ success: false, message: 'Error writing file' });}

                res.json({ success: true });
            });
        });
    }else if (id="delete"){
        app.delete('/delete-entry/:id', (req, res) => {
            const entryId = req.params.id;
            const filePath = path.join(__dirname, '/data/events.json');
        
            // Read and parse the JSON file
            fs.readFile(filePath, 'utf8', (err, fileData) => {
                if (err) {return res.status(500).json({ success: false, message: 'Error reading data file.' });}
        
                let jsonData;
                try {
                    jsonData = JSON.parse(fileData);
                } catch (parseErr) {
                    return res.status(500).json({ success: false, message: 'Error parsing data file.' });
                }
        
                // Find and remove the entry by ID
                const updatedData = jsonData.filter(item => String(item.id) !== String(entryId));
        
                if (updatedData.length === jsonData.length) {
                    // No entry was found
                    return res.status(404).json({ success: false, message: 'Entry not found.' });
                }
        
                // Write updated data back to file
                fs.writeFile(filePath, JSON.stringify(updatedData, null, 2), 'utf8', (err) => {
                    if (err) {
                        return res.status(500).json({ success: false, message: 'Error writing data file.' });
                    }
                    res.json({ success: true });
                });
            });
        });
    }
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});