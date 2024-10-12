const mongoose = require("mongoose")

const addressSchema = new mongoose.Schema({
    street:String,
    city:String,
    country:String
})

const AddressModel = mongoose.model("address", addressSchema)


const userFewSchema = new mongoose.Schema({
    username:String,
    email:String,
    addresses:[{
        type:String,
        ref:"address" 
    }]
})

const UserFewModel = mongoose.model("userfew",userFewSchema)


module.exports={
    AddressModel,
    UserFewModel
}