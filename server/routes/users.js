let express = require('express');
let router = express.Router();
let usersProcess = require('../process/users')
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

/* GET users listing. */
router.get('/', authenticateJWT, (req, res) => {
  if(req['user'].role !== 'CONSULT_ROLE'){
      usersProcess.list()
      .then((ret) => {
          ret.forEach(user => delete user.password);
          return ret;
      })
      .then((retWithoutPwd) => {
          res.send(retWithoutPwd)
      })
  } else {
       res.status(401).send("Unauthorized");
   }
});

router.get('/:id', authenticateJWT, (req, res) => {
    if(req['user'].role !== 'CONSULT_ROLE') {
        usersProcess.getById(req.params.id)
            .then((ret) => {
                ret.forEach(user => delete user.password);
                return ret;
            }).then((retWithoutPwd) => {
            res.status(200).send(retWithoutPwd)
        }).catch(err => res.status(400).send({message: err}));
    } else {
        res.status(401).send("Unauthorized");
    }
});

router.post('/login', function(req, res) {
  usersProcess.login(req.body)
      .then(ret => res.status(200).json({ ret }))
      .catch(err => res.status(401).send({ message: err }));
});

router.post('/register', function(req, res) {
  usersProcess.register(req.body)
      .then(ret => res.status(201).send(ret))
      .catch(err => res.status(400).send({ message: err }));
});

router.delete('/:id', authenticateJWT, function(req, res) {
    if(req['user'].role === 'ADMINISTRATOR_ROLE') {
        usersProcess.remove(req.params.id)
            .then(ret => {
                if (ret.value) {
                    res.status(200).send(ret)
                } else {
                    res.status(404).send({message: "User not found."})
                }
            })
            .catch(err => res.status(400).send({message: err}));
    } else {
        res.status(401).send("Unauthorized");
    }
});

module.exports = router;
