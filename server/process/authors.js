let request = require('request');

const getAll = function() {
    return new Promise((resolve,reject) => {
        request('http://localhost:8081/api/v1/authors', function (error, response) {
            if(error) {
                reject(error)
            }
            resolve(response.body) // Print the response status code if a response was received
        });
    })
}

exports.getAll = getAll;
