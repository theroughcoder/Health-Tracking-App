const express = require("express");
const user = require("./users");
const health = require("./health");

const router = express.Router(); 

// this is handling user routes
router.use('/user', user);
// this is handling all health related routes 
router.use('/health', health);


module.exports = router;

