var express = require('express');
var router = express.Router();
const user_controller = require("../controllers/userController");
const schemas = require("../models/schemas");
const validate = require("../middleware/validate")


router.post("/register", validate(schemas.user), user_controller.create);
router.post("/login", user_controller.login);

module.exports = router;
