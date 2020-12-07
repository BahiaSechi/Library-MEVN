const springApi = require("../spring-api");

const getAll = function () {
    return springApi().get('publishers');
}

const add = function (newPublisher) {
    return springApi().post('publishers', newPublisher);
}

const remove = function remove(id) {
    return springApi().delete(`publishers/${id}`);
}


exports.getAll = getAll;
exports.add = add;
exports.remove = remove;