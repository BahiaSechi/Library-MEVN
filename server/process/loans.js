const springApi = require("../spring-api");

const getAll = function() {
    return springApi().get('loans');
}

const add = function (newLoan) {
    return springApi().post('loans', newLoan);
}

const returnLoan = function (id) {
    return springApi().post(`loans/${id}/return`, {});
}

const remove = function (id) {
    return springApi().delete(`loans/${id}`);
}

exports.getAll = getAll;
exports.returnLoan = returnLoan;
exports.add = add;
exports.remove = remove;
