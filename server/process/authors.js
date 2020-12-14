const springApi = require("../spring-api");

const getAll = function() {
    return springApi().get('authors');
}

const getById = function(authorId) {
    return springApi().get(`authors/${authorId}`);
}

const add = function (newAuthor) {
    return springApi().post('authors', newAuthor);
}

const remove = function (id) {
    return springApi().delete(`authors/${id}`);
}

exports.getAll = getAll;
exports.getById = getById;
exports.add = add;
exports.remove = remove;
