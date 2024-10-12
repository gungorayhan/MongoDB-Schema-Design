const express = require("express")
const { get, create } = require("../../controller/one-to-many/index.js")

const router = express.Router()

router.get("/:id", get)
router.post("/", create)


module.exports = router