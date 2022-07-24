const mongoose = require("mongoose")
const validator = require("validator")
const Client = mongoose.model("Client", {
    name:{
        type:String,
        trim:true,
        lowercase:true,
        required:true,
        minlength:3,
        maxlength:20
    }, 
 
    accountIntialBalance:{
        type:Number,
        required:true
    }, 
    currentBalnce:{
        type:Number,
        required:true
    }, 

    createdAt:{
        type:Date,
        default: Date.now()
    }

    ,transactions:
    {
        
        
        
        
        
        withdraw: [
        { 
           
                transactionAt:{
                type:Date,
                default: Date.now()
            },
          
            withdraw:{ 
                
        type:Number,default:Date.now(),status:{type:Boolean,default:false},required:true
        
            ,validate(value){
                      if (value>5000||this.currentBalnce<value) {
                          throw new Error("invalid Number withdraw should be number <5000 and < currentBalance ")
                          
                      }
                  }
        
        
        }
       
    
    
    
    
    }]
,addBalance: [

    { 
   
        addBalanceAdd:{
            type:Date,
            default: Date.now()
        },
        
        addBalance:{ 
            
        type:Number,default:Date.now(),status:{type:Boolean,default:false},required:true
        
        ,validate(value){
                 
            if (value < 0|| value > 10000) {
                      throw new Error("invalid Number addBalance should be number <5000 and < currentBalance ")
                      
                  }
              }
        
        
        }
        
        }


]







}



})
module.exports = Client


// clients => name, accountIntialBalance, currentBalnce , transaction:[
//     {date, type, status}
// ]
// add customer (show, del, edit, add, show all)
// add transaction => 
//     withdraw => number <5000 , <currentBalance , add tranaction
//     addBalance => number > 0 , <10000