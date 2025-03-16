require('dotenv').config();

const apiConfig = {
    apiUrl: process.env.API_URL,
    port: process.env.PORT || 3000
};

module.exports = apiConfig;