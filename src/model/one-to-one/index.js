const mongoose =require("mongoose")


const profileSchema = new mongoose.Schema({
    bio:{type:String},
    website:{type:String}
})

const userSchema= new mongoose.Schema({
    username:{type:String},
    email:{type:String},
    profile:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"profile"
    }
})


 const ProfileModel = mongoose.model("profile",profileSchema)

 const UserModel = mongoose.model("user",userSchema)


 module.exports={
    ProfileModel,
    UserModel
 }