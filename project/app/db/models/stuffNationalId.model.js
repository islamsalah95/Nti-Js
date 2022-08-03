const mongoose = require("mongoose");
const validator = require("validator")

const stuffNationalIdSchema = mongoose.Schema({
    NationalId:{
        type:Number,
        required:true,
        trim:true,
        minlength:14, 
        maxlength:14,
        unique:true
    }, 
    type:{
        type:String,
        required:true,
        trim:true,
        enum:["admin","doctor","nurse"],
        lowercase:true
    }
    
})


const StuffNationalId = mongoose.model("StuffNationalId", stuffNationalIdSchema)
module.exports=StuffNationalId