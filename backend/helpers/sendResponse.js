// helpers/sendResponse.js

const sendResponse = (res, status, data) => {
    res.status(status).json(data);
}

export default sendResponse;
