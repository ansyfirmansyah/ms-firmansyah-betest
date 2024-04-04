const express = require("express");
const router = express.Router();
const authController = require('../controllers/authController');

// route khusus untuk generate token, route ini tidak perlu token di header
router.post("/token", authController.post);

module.exports = router;