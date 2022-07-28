const mongoose = require("mongoose");
const taskSchema = mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
        unique:true
    }, 
    content:{
        type:String,
        required:true,
        trim:true,
    }, 
    status:{
        type:Boolean,
        required:true,
        default:false
    }, 
    
    comments:[{
        comment:{        
            type:String,
            required:true,
            trim:true,
        },
        userId:{
            type:mongoose.Schema.Types.ObjectId,
           required:true,
            ref:"User"
        }
    }], 
    addedby:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    }, 
    assignedTo:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    }
})
const Task = mongoose.model("Task", taskSchema)
module.exports=Task