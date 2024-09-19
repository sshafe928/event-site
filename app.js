const express = require('express')
const bodyParser = require("body-parser")
const fs = require('fs')
const app = express()
const PORT = 5000
const path = require('path')
let Adminstatus = false;
const ADMIN = { username: 'admin_man', password: 'givemeinfo'};

//Middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

//load tasks from the JSON file
const getEvents = () => {
    const data = fs.readFileSync('./data/events.json', 'utf8');
    return JSON.parse(data);
};

const saveEvents = (events) => {
    fs.writeFileSync('./data/events.json', JSON.stringify(events, null, 2));
};


// Route for the home page
app.get('/', (req, res) => {
    const events = getEvents();
    res.render('pages/events', { events: events, isAdmin: Adminstatus });
});

// Route for admin login page
app.get('/admin', (req, res) => {
    res.render('pages/admin');
});

app.get('/logout',(req,res) => {
    const events = getEvents();
    res.render('pages/events', { isAdmin: false, events: events })
})

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
    const events = getEvents();
    res.render('pages/events', { isAdmin: Adminstatus, events: events });
});



app.post('/events/add', (req, res) => {
    const events = getEvents();
    const newEvent = {
        id: events.length+1,
        name: req.body.name,
        date: req.body.date,
        type: req.body.type,
        attendees: req.body.attendees
    };
    events.push(newEvent);
    saveEvents(events);
    res.redirect('/events');
});


app.get('/edits/:id/edit', (req, res) => {
    const events = getEvents();
    const event = events.find(event => event.id == req.params.id)
    res.render('pages/edits', { event });
});


app.post('/edits/:id', (req,res) => {
    const events = getEvents();
    const eventIndex = events.findIndex(events => events.id == req.params.id)//finding the right item
    events[eventIndex].type = req.body.type; //redefine the task data
    events[eventIndex].name = req.body.name; //redefine the task data
    events[eventIndex].date = req.body.date; 
    events[eventIndex].attendees = req.body.attendees; 
    saveEvents(events)
    res.redirect('/events');
});

//delete an event
app.post('/events/:id/delete',(req,res) => {
    let events = getEvents();
    const idToDelete = parseInt(req.params.id, 10);
    events = events.filter(event => event.id !== idToDelete);
    saveEvents(events);
    res.redirect('/events');
});







app.post('/events', (req, res) => {
    const { event, name, email } = req.body;

    // Check for required fields
    if (!event || !name || !email) {
        return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    const attendeeData = {
        eventName: event,
        attendee: {
            name,
            email
        }
    };

    const registrationFilePath = path.join(__dirname, 'data', 'registration.json');
    const eventsFilePath = path.join(__dirname, 'data', 'events.json');

    // Read the registration file
    fs.readFile(registrationFilePath, 'utf8', (err, fileContent) => {

        let registrationData = JSON.parse(fileContent);
        registrationData.push(attendeeData);

        // Write updated registration data back to file
        fs.writeFile(registrationFilePath, JSON.stringify(registrationData, null, 2), 'utf8', (err) => {

            // Now update the events.json file
            fs.readFile(eventsFilePath, 'utf8', (err, eventsContent) => {
               

                let eventsData = JSON.parse(eventsContent);
                const eventToUpdate = eventsData.find(e => e.name === event);

                // Increment the number of attendees
                eventToUpdate.attendees += 1;

                // Write updated events data back to file
                fs.writeFile(eventsFilePath, JSON.stringify(eventsData, null, 2), 'utf8', (err) => {
                    res.redirect('/events');
                });
            });
        });
    });
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});