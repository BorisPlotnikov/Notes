// index.js

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import errorHandler from './middleware/errorHandler.js';
import apiConfig from './utils/apiConfig.js';
import mongoose from 'mongoose';
import notesRouter from './routes/notes.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(errorHandler);

app.use('/notes', notesRouter);

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log("Error connecting to MongoDB: ", error));

const PORT = apiConfig.port;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

