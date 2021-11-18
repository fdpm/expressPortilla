var express = require('express');
var router = express.Router();
const user_controller = require("../controllers/userController");

/* GET users listing. */
router.post("/register", user_controller.create);

module.exports = router;
