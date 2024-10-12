const { create, get } = require("../../controller/one-to-one/index.js");

const express = require("express")

const router = express.Router();

router.get("/:id", get)
router.post("/", create);


module.exports = router