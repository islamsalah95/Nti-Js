const taskModel=require("../db/models/task.model")
const {resGenerator} = require("../helpers/methods")
const otpp=require("otp-generator")
const nodemailer = require("nodemailer");
const {sendEmailAcc} = require("../helpers/email.helper")
const Email = require('email-templates');

class Task{

    
    static addTask=async function(req,res){

        try{
           
            const userData = await new taskModel({...req.body,addedby:req.user._id})
             userData.save()

           resGenerator(res, 200,userData, "message")
        }catch (error) {
            resGenerator(res, 500, error, "err")
        }
        
        
        }


        static showUser=async function(req,res){

            try{
               
                const userData = await taskModel.find({addedby:req.user._id})
                
    
               resGenerator(res, 200,userData, "message")
            }catch (error) {
                resGenerator(res, 500, error, "err")
            }
            
            

            }
        
            static showAdminTasks=async function(req,res){

                try{
                   
                    const userData = await taskModel.find()
                    
        
                   resGenerator(res, 200,userData, "message")
                }catch (error) {
                    resGenerator(res, 500, error, "err")
                }
                
                
                }
            

static assignToUser=async function(req,res){

    try{
       
        const userData = await taskModel.findById(req.body.id)
        

       resGenerator(res, 200,userData, "message")
    }catch (error) {
        resGenerator(res, 500, error, "err")
    }
    
    
    }

}

module.exports=Task