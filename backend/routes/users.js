const express = require("express");
const router = express.Router();
const user  = require('../controllers/users_controller')

router.post('/signup', user.createUser);
router.post('/signin', user.login);

 
module.exports = router;