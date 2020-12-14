const axios = require("axios");

module.exports = () => {
    return axios.create({
        baseURL: 'http://localhost:8081/api/v1',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        }
    })
}

