const springApi = require("../spring-api");

const getAll = function() {
    return springApi().get('authors');
}

exports.getAll = getAll;
