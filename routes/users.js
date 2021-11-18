var express = require('express');
var router = express.Router();
const user_controller = require("../controllers/userController");


router.post("/register", user_controller.create);
router.post("/login", user_controller.login);

module.exports = router;
