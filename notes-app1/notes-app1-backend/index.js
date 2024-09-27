const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Import Routes
const notesRoute = require('./routes/notes');
app.use('/notes', notesRoute);

// Routes
app.get('/', (req, res) => {
    res.send('We are on home');
});

// Connect to DB
async function connectToDatabase() {
    try {
        await mongoose.connect(process.env.DB_CONNECTION);
        console.log('Connected to DB!');
    } catch (error) {
        console.log('Failed to connect to DB:', error);
    }
}

connectToDatabase();

// Listen to the server
app.listen(3001, () => {
    console.log('Server is running on port 3001');
});