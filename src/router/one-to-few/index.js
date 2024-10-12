const { get, create } = require("../../controller/one-to-few/index.js")

const express = require("express")


const router= express.Router()

router.get("/:id", get)
router.post("/", create)

module.exports = router