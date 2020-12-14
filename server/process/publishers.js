const springApi = require("../spring-api");

const getAll = function () {
    return springApi().get('publishers');
}

const getById = function(publisherId) {
    return springApi().get(`publishers/${publisherId}`);
}

const add = function (newPublisher) {
    return springApi().post('publishers', newPublisher);
}

const remove = function remove(id) {
    return springApi().delete(`publishers/${id}`);
}


exports.getAll = getAll;
exports.getById = getById;
exports.add = add;
exports.remove = remove;