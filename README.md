# Event Registration System

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
  - [Viewing Events](#viewing-events)
  - [Registering for an Event](#registering-for-an-event)
  - [Admin Login](#admin-login)
  - [Adding a New Event](#adding-a-new-event-admin-only)
  - [Editing an Event](#editing-an-event-admin-only)
  - [Deleting an Event](#deleting-an-event-admin-only)
- [API Documentation](#api-documentation)
- [License](#license)
- [Contributing](#contributing)
- [Contact](#contact)

## Project Overview

This is an Event Registration System built with Node.js, EJS, and Express. It allows users to view events, register for them, and provides an admin interface for managing events. 

## Features

- View list of events
- Register for events
- Admin login
- Add new events (admin only)
- Edit existing events (admin only)
- Delete events (admin only)

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/event-registration-system.git
   ```
2. Navigate to the project directory:
   ```
   cd event-registration-system
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Start the server:
   ```
   npm start
   ```
   The server will start running on `http://localhost:5000`.

## Usage

### Viewing Events

Navigate to `http://localhost:5000/events` to view the list of events.

### Registering for an Event

To register for an event, send a POST request to `/events` with the following data:

```json
{
  "event": "Event Name",
  "name": "Attendee Name",
  "email": "attendee@example.com"
}
```

### Admin Login

1. Navigate to `http://localhost:5000/admin`
2. Enter the admin credentials:
   - Username: admin_man
   - Password: givemeinfo

### Adding a New Event (Admin only)

After logging in as admin, you can add a new event by sending a POST request to `/events/add` with the following data:

```json
{
  "name": "New Event Name",
  "date": "2024-10-01",
  "type": "Conference",
  "attendees": 0
}
```

### Editing an Event (Admin only)

To edit an event, navigate to `/edits/:id/edit` where `:id` is the ID of the event you want to edit.

### Deleting an Event (Admin only)

To delete an event, send a POST request to `/events/:id/delete` where `:id` is the ID of the event you want to delete.

## API Documentation

### GET /events
- **Description**: Retrieves all events
- **Response**: JSON array of event objects

### POST /events
- **Description**: Registers an attendee for an event
- **Request Body**:
  - `event`: string (required)
  - `name`: string (required)
  - `email`: string (required)
- **Response**: Redirects to /events on success

### POST /events/add (Admin only)
- **Description**: Adds a new event
- **Request Body**:
  - `name`: string (required)
  - `date`: string (required, format: YYYY-MM-DD)
  - `type`: string (required)
  - `attendees`: number (required)
- **Response**: Redirects to /events on success

### POST /edits/:id (Admin only)
- **Description**: Updates an existing event
- **URL Parameters**: id (event ID)
- **Request Body**:
  - `name`: string (required)
  - `date`: string (required, format: YYYY-MM-DD)
  - `type`: string (required)
  - `attendees`: number (required)
- **Response**: Redirects to /events on success

### POST /events/:id/delete (Admin only)
- **Description**: Deletes an event
- **URL Parameters**: id (event ID)
- **Response**: Redirects to /events on success

## Versions

- **v1.0.1**: 20240913T011000 - Initial commit, adding the gitignore and licence
- **v1.0.2**: 20240913T031900 - Creating file structure and coding bulk of the project
- **v1.0.3**: 20240915T114700 - Making the Admin functionality 
- **v1.0.4**: 20240916T102600 - Rewriting pathing and app.js
- **v1.0.5**: 20240916T023500 - Creating the admin log in with credentials 
- **v1.0.6**: 20240917T030900 - Testing the admin side and fixing small required bugs
- **v1.0.7**: 20240918T053800 - Gathering information and posting it into the registration JSON
- **v1.0.8**: 20240918T055100 - Attempting to make attendees counter go up and update in real time
- **v1.0.9**: 20240918T061300 - Beginning CSS
- **v1.1.0**: 20240919T121200 - Fixing small bugs such as repathing
- **v1.1.1**: 20240919T121700 - Merging branches
- **v1.1.2**: 20240919T123100 - Fixed small pathing errors
- **v1.1.3**: 20240919T030300 - Creating a logout for admins for simplicity, as well as adding fonts
- **v1.1.4**: 20240919T111500 - Finishing all Css and making sure i like the site
- **v1.1.5**: 20240925T091300 - Adding comments and ReadMe file


## License

This project is licensed under the MIT License.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Contact

If you have any questions, feel free to reach out to us at [sabrinashafer321@gmail.com]