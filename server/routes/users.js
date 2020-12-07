let express = require('express');
let router = express.Router();
let usersProcess = require('../process/users')

/* GET users listing. */
router.post('/login', function(req, res) {
  usersProcess.login(req.body)
      .then(ret => res.status(200).send(ret))
      .catch(err => res.status(401).send({ message: err.message }));
});

module.exports = router;
