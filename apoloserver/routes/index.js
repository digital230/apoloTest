var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('here')
  res.send({ response: 'I am alive' }).status(200);
});

module.exports = router;
