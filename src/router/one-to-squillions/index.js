const express= require("express")
const {get, create, createTransactions } = require("../../controller/one-to-squillions/index.js")

const router = express.Router()

router.get("/:id/transactions",get)
router.post("/",create)
router.post("/:id/transactions",createTransactions)

module.exports = router