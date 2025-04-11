const mongoose=require("mongoose")

const ItemSchema=new mongoose.Schema({
    title:{type:String},
    description:{type:String},
    createdBy:{type:mongoose.Schema.Types.ObjectId ,ref:"User",required:true},
    createdAt:{type:Date,default:Date.now}
})

module.exports=mongoose.model("Task",ItemSchema)