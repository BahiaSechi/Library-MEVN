let express = require('express');
let router = express.Router();
const authorsProcess = require('../process/authors');
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


/* GET authors listing.*/
router.get('/',authenticateJWT, (req, res) => {
    authorsProcess.getAll()
        .then(response => res.status(response.status).send(response.data))
        .catch(err => res.status(err.response.status).send({ message: err.message }));
});

/* Create a new author. */
router.post('/',authenticateJWT, function(req, res) {
    authorsProcess.add(req.body)
        .then(response => res.status(response.status).send(response.data))
        .catch(err => res.status(err.response.status).send({message: err.message}));
});

/* DELETE an author by id.*/
router.delete('/:id',authenticateJWT, function (req,res) {
    authorsProcess.remove(req.params.id)
        .then(response => res.status(response.status).send(response.data))
        .catch(err => res.status(err.response.status).send({message: err.message}));
});

module.exports = router;
