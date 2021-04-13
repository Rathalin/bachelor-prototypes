var express = require('express');
var router = express.Router();
const userM = require('../../models/userModel');


router.get('/', async function (req, res) {
  // Load user  
  const { user } = req;
  res.render('edit_profile', { title: 'Edit profile', user, });
});


router.post('/', async function (req, res) {
  // Evaluate result
  // TODO
  let { firstname, lastname, gender, dateOfBirth } = req.body;

  let { user } = req;

  // Update user
  await userM.updateOne(
    { _id: user._id },
    { firstname, lastname, gender, dateOfBirth }
  ).exec();
  user = await userM.findById(user._id).exec();
  console.log(user);
  res.render('edit_profile', { title: 'Saved Profile', user, success: { text: 'Profile saved.' } })
});


module.exports = router;
