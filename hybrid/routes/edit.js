var express = require('express');
var router = express.Router();
const userM = require('../models/userModel');


router.get('/', async function (req, res) {
  // Load user
  const user = await userM.findById(req.userId).exec();
  res.render('edit_profile', { title: 'Edit profile', user, });
});


router.post('/', async function (req, res) {
  // Evaluate result
  // TODO
  let { firstname, lastname, gender, dateOfBirth } = req.body;

  // Update user
  await userM.updateOne(
    { _id: req.userId },
    { firstname, lastname, gender, dateOfBirth }
  ).exec();
  const user = await userM.findById(req.userId).exec();
  console.log(user);
  res.render('edit_profile', { title: 'Saved Profile', user, success: { text: 'Profile saved.' } })
});


module.exports = router;
