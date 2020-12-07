const springApi = require("../spring-api");

const getAll = function() {
    return springApi().get('authors');
}

const add = function (newAuthor) {
    return springApi().post('authors', newAuthor);
}

exports.getAll = getAll;
exports.add = add;
