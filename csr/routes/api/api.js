var express = require('express');
var router = express.Router();

// Authentication
const { authenticateToken } = require('../../middleware/authenticate');

const loginRouter = require('./login');
const logoutRouter = require('./logout');
const editRouter = require('./edit');
const registerRouter = require('./register');


router.use('/login', loginRouter);
router.use('/register', registerRouter);
router.use('/logout', authenticateToken, logoutRouter);
router.use('/edit', authenticateToken, editRouter);


module.exports = router;
