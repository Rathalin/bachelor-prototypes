var express = require('express');
var router = express.Router();
const userM = require('../models/userModel');

/* GET users listing. */
router.get('/', async function(req, res, next) {
  // get all users without the password property
  res.json(await userM.find({}, '-password'));
});

module.exports = router;
