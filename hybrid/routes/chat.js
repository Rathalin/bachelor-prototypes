var express = require('express');
var router = express.Router();
const userM = require('../models/userModel');


router.post('/send', async function (req, res) {
  // Send chat to all


  // Insert chat
  let chatData = { };
  res.render('index', { title: 'Chat', user, chatData });
});


module.exports = router;
