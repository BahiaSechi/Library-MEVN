let express = require('express');
let router = express.Router();
const authorsProcess = require('../process/authors');


/* GET authors listing.*/
router.get('/', (req, res) => {
    authorsProcess.getAll()
        .then(response => res.status(response.status).send(response.data))
        .catch(err => res.status(err.response.status).send({ message: err.message }));
});

/* Create a new author. */
router.post('/', function(req, res) {
    authorsProcess.add(req.body)
        .then(response => res.status(response.status).send(response.data))
        .catch(err => res.status(err.response.status).send({message: err.message}));
});

/* DELETE an author by id.*/
router.delete('/:id', function (req,res) {
    authorsProcess.remove(req.params.id)
        .then(response => res.status(response.status).send(response.data))
        .catch(err => res.status(err.response.status).send({message: err.message}));
});

module.exports = router;
