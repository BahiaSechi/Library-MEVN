let express = require('express');
let router = express.Router();
let usersProcess = require('../process/users')


/* GET users listing. */
router.get('/',(req, res) => {
  usersProcess.list()
    .then((ret) => {
      ret.forEach(user => delete user.password);
      return ret;
    })
    .then((retWithoutPwd) => {
      res.send(retWithoutPwd)
    })
});

router.post('/login', function(req, res) {
  usersProcess.login(req.body)
      .then(ret => res.status(200).send(ret))
      .catch(err => res.status(401).send({ message: err }));
});

router.post('/register', function(req, res) {
  usersProcess.register(req.body)
      .then(ret => res.status(201).send(ret))
      .catch(err => res.status(400).send({ message: err }));
});

router.delete('/:id', function(req, res) {
  usersProcess.remove(req.params.id)
      .then(ret => {
        if(ret.value) {
          res.status(200).send(ret)
        } else {
          res.status(404).send({message: "User not found."})
        }
      })
      .catch(err => res.status(400).send({message: err}));
});

module.exports = router;
