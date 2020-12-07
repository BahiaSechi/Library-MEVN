const springApi = require("../spring-api");

const getAll = function () {
    return springApi().get('publishers');
}

const add = function (newPublisher) {
    return springApi().post('publishers', newPublisher);
}

exports.getAll = getAll;
exports.add = add;