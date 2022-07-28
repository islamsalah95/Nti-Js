const mongoose = require("mongoose");
const validator = require("validator")


const reservationSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        minlength:2, 
        maxlength:20
    }, 
    status:{
        type:Boolean,
        default:false
    }, 
    VezeetaPrice:{
        type:Number,
        required:true,
        default:100,
        min:100,
    },
    day:{
        type:String,
        required: true,
        enum:['sun','tus']
    },
    hour:{
        type:String,
        required: true,
        enum:['1','2','3','4','5']
    },
    DoctorId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,

    }, 
    UserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    }
    
})


const Reservation = mongoose.model("Reservation", reservationSchema)
module.exports=Reservation