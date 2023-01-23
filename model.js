const mongoose=require('mongoose')
const user_schema=new mongoose.Schema({
    name:{type:String,default:null},
    email:{type:String,unique:true},
    dob:{type:Date}

},{collection:"user_details"})
module.exports=mongoose.model('user_details',user_schema)
