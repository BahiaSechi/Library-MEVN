let express = require('express');
let router = express.Router();
const booksProcess = require('../process/books');

/* GET books listing.*/
router.get('/', (req, res) => {
    booksProcess.getAll()
        .then(response => res.status(response.status).send(response.data))
        .catch(err => res.status(err.response.status).send({ message: err.message }));
});

/* Create a new book. */
router.post('/', function(req, res) {
    booksProcess.add(req.body)
        .then(response => res.status(response.status).send(response.data))
        .catch(err => res.status(err.response.status).send({message: err.message}));
});

/* DELETE a book by id.*/
router.delete('/:id', function (req,res) {
    booksProcess.remove(req.params.id)
        .then(response => res.status(response.status).send(response.data))
        .catch(err => res.status(err.response.status).send({message: err.message}));
});

module.exports = router;
