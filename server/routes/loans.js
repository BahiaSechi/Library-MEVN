let express = require('express');
let router = express.Router();
const loansProcess = require('../process/loans');
const jwt = require("jsonwebtoken");
const accessTokenSecret = "web-services-secret"

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.split(' ')[0] === "Bearer") {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
}


/* GET loans listing.*/
router.get('/', (req, res) => {
    loansProcess.getAll()
        .then(response => res.status(response.status).send(response.data))
        .catch(err => res.status(err.response.status).send({ message: err.message }));
});

/* Create a new loan. */
router.post('/', function(req, res) {
    loansProcess.add(req.body)
        .then(response => res.status(response.status).send(response.data))
        .catch(err => res.status(err.response.status).send({message: err.message}));
});

/* DELETE an loan by id.*/
router.delete('/:id', function (req,res) {
    loansProcess.remove(req.params.id)
        .then(response => res.status(response.status).send(response.data))
        .catch(err => res.status(err.response.status).send({message: err.message}));
});

module.exports = router;
