const springApi = require("../spring-api");

const getAll = function () {
    return springApi().get('publishers');
}

exports.getAll = getAll;