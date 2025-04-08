// index.js

const express = require('express');
const app = express();
app.use(express.json());

const cors = require('cors');
app.use(cors());

const errorHandler = require('./middleware/errorHandler');
const apiConfig = require('./utils/apiConfig');
app.use(errorHandler);
const notesRouter = require('./routes/notes');
app.use('/notes', notesRouter);

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Connected to MongoDB"))
.catch((error) => console.log("Error connecting to MongoDB: ", error));

const PORT = apiConfig.port;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
