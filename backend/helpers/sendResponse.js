// helpers/sendResponse.js

module.exports = (res, status, data) => {
    res.status(status).json(data);
}
