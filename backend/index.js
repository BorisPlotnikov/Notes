// index.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const apiConfig = require('./utils/apiConfig');
const app = express();
app.use(cors());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Connected to MongoDB"))
.catch((error) => console.log("Error connecting to MongoDB: ", error));

const notesRouter = require('./routes/notes');
const errorHandler = require('./middleware/errorHandler');

app.use(express.json());

app.use('/notes', notesRouter);

app.use(errorHandler);

const PORT = apiConfig.port;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
