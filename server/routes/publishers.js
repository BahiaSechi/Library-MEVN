let express = require('express');
let router = express.Router();

/* GET publishers listing.*/
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

/* GET a publisher by id.*/
router.get('/:id', function(req, res, next) {
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
