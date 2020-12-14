const springApi = require("../spring-api");

const getAll = function() {
    return springApi().get('books');
}

const getById = function(bookId) {
    return springApi().get(`books/${bookId}`);
}

const add = function (newBook) {
    return springApi().post('books', newBook);
}

const remove = function (bookId) {
    return springApi().delete(`books/${bookId}`);
}

exports.getAll = getAll;
exports.add = add;
exports.remove = remove;
exports.getById = getById;