// middleware/errorHandler.js

import createHttpError from 'http-errors';

const errorHandler = (err, req, res, _next) => {
    const error = err.isHttpError ? err : createHttpError(err.status || 500, err.message);
    res.status(error.status).json({ error: { message: error.message } });
};

export default errorHandler;
