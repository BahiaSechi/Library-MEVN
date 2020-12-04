let express = require('express');
let router = express.Router();

/* GET authors listing.*/
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
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
