const express = require("express");
const{addDailyHealth, HealthReport} = require("../controllers/health_controller.js");

const router = express.Router();

router.post('/add-daily-health', addDailyHealth);
router.get('/health-report/:userId', HealthReport);

 

module.exports = router;