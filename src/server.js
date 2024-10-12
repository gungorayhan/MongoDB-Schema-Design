const express = require("express")
const mongoose = require("mongoose")
const OneToOne = require("./router/one-to-one/index.js")
const OneToFew = require("./router/one-to-few/index.js")
const OneToMany = require("./router/one-to-many/index.js")
const OneToSquillions = require("./router/one-to-squillions/index.js")
const ManyToMany = require("./router/many-to-many/index.js")

const app=express();


app.use(express.json())

mongoose.connect("mongodb://127.0.0.1:27017/mongodbSchemaDesign",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
})


app.use("/one-to-one",OneToOne)
app.use("/one-to-few",OneToFew)
app.use("/one-to-many",OneToMany)
app.use("/one-to-squillions",OneToSquillions)
app.use("/many-to-many",ManyToMany)


app.listen(8888,()=>{
    console.log("port: 8888")
})