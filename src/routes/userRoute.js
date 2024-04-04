const express = require("express");
const router = express.Router();
const userController = require('../controllers/userController');
const cache = require('../middlewares/cacheMiddleware');

router.get("/users", cache.getAllUser, userController.getAll);
router.post("/users", userController.post);
router.get("/users/:id", cache.getOneUser, userController.get);
router.put("/users/:id", userController.put);
router.delete("/users/:id", userController.delete);

module.exports = router;