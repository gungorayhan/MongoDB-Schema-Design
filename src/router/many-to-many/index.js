const express = require("express")
const { getUser, getCourse, createUser, createCourse, UserToCourse } = require("../../controller/many-to-many/index.js")

const router = express.Router()

router.get("/user/:id",getUser)
router.get("/course/:id",getCourse)
router.post("/user",createUser)
router.post("/course",createCourse)
router.post("/usertocourse",UserToCourse)

module.exports = router