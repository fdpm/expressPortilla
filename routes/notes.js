const express = require("express");
const router = express.Router();
const note_contoller = require("../controllers/noteController");
const auth = require("../middleware/auth")
const schemas = require("../models/schemas");
const validate = require("../middleware/validate")



//obtiene por id
router.get("/:id", note_contoller.show)
//obtiene todos
router.get("/",auth, note_contoller.index)
//agrega uno
router.post("/", validate(schemas.note),note_contoller.create)
//borra por id
router.delete("/:id", note_contoller.destroy); 

router.put("/:id", note_contoller.update);

module.exports = router;        