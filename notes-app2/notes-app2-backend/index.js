const express = require('express');
const app = express();
const notesRouter = require('./routes/notes');
const errorHandler = require('./middleware/errorHandler');

app.use(express.json());
app.use('/notes', notesRouter);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});