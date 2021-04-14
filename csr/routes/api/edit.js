var express = require('express');
var router = express.Router();
const userM = require('../../models/userModel');


router.post('/', async function (req, res) {
  // Evaluate result
  // TODO
  let { firstname, lastname, gender, dateOfBirth } = req.body.user;
  let { user } = req;

  // Update user
  await userM.updateOne(
    { _id: user._id },
    { firstname, lastname, gender, dateOfBirth }
  ).exec();
  user = await userM.findById(user._id).exec();
  res.json({ user, success: { text: 'Profile saved.' } })
});


module.exports = router;
