let express = require('express');
let router = express.Router();
const publishersProcess = require('../process/publishers')

/* GET publishers listing.*/
router.get('/', function(req, res) {
    publishersProcess.getAll()
        .then(response => res.status(response.status).send(response.data))
        .catch(err => res.status(err.response.status).send({ message: err.message }));
});

/* GET a publisher by id.*/
router.get('/:id', function(req, res) {
    res.send('respond with a resource');
});

/* Create a new publisher. */
router.post('/', function(req, res, next) {
    res.send('respond with a resource');
});

/* DELETE a publisher by id.*/
router.delete('/:id', function (req,res,next) {
    res.send('respond with a resource');
});

module.exports = router;
