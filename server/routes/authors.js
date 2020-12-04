let express = require('express');
let router = express.Router();
const authorsProcess = require('../process/authors');


/* GET authors listing.*/
router.get('/', (req, res) => {
    authorsProcess.getAll()
        .then(ret => res.status(201).send(ret))
        .catch(err => res.status(400).send({ message: err.message }));
});

/* GET an author by id.*/
router.get('/:id', function(req, res, next) {
    res.send('respond with a resource');
});

/* Create a new author. */
router.post('/', function(req, res, next) {
    res.send('respond with a resource');
});

/* DELETE an author by id.*/
router.delete('/:id', function (req,res,next) {
    res.send('respond with a resource');
});

module.exports = router;
