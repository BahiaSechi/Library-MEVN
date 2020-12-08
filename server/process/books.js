const springApi = require("../spring-api");

const getAll = function() {
    return springApi().get('books');
}

const add = function (newBook) {
    return springApi().post('books', newBook);
}

const remove = function (id) {
    return springApi().delete(`books/${id}`);
}

exports.getAll = getAll;
exports.add = add;
exports.remove = remove;