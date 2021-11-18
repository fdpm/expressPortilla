var express = require('express');
var router = express.Router();
const user_controller = require("../controllers/userController");


router.post("/register", user_controller.create);

module.exports = router;
