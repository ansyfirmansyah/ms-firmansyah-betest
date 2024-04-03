const express = require("express");
const router = express.Router();
const userController = require('../controllers/userController');

router.get("/users", userController.getAll);
router.post("/users", userController.post);
router.get("/users/:id", userController.get);
router.put("/users/:id", userController.put);
router.delete("/users/:id", userController.delete);

module.exports = router;