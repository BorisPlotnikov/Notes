// apiConfig.js

import dotenv from 'dotenv';
dotenv.config();

const apiConfig = {
    port: process.env.PORT || 3001
};

export default apiConfig;
