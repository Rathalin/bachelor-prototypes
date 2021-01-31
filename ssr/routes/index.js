var express = require('express');
var router = express.Router();
const userM = require('../models/userModel');


router.get('/', async function (req, res, next) {

  const user = await userM.findById(req.userId).exec();

  res.render('index', { title: user.username, user });
});

module.exports = router;
