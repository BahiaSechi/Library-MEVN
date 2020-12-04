let express = require('express');
let router = express.Router();

/* GET books listing.*/
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

/* GET a book by id.*/
router.get('/:id', function(req, res, next) {
    res.send('respond with a resource');
});

/* Create a new book. */
router.post('/', function(req, res, next) {
    res.send('respond with a resource');
});

/* DELETE a book by id.*/
router.delete('/:id', function (req,res,next) {
    res.send('respond with a resource');
});

module.exports = router;
