const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({
    userName:{type:String},
    userEmail:{type:String,isRequired:true},
    userPassword:{type:String,isRequired:true}

})
module.exports=mongoose.model("User",userSchema)