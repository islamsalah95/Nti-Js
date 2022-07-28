const reservationModel=require("../db/models/reservation.model")
const {resGenerator} = require("../helpers/methods")
const nodemailer = require("nodemailer");
const send = require("../helpers/email.helper")


class Reservation{
   
    
    static appointment=async function(req,res){

        try {
            
        
        const clinicData=new reservationModel({...req.body,UserId: req.user._id})
        await clinicData.save()
        
         resGenerator(res, 200, clinicData, "success")
        
        } catch (error) {
            resGenerator(res, 500, error, "err")
        }
        
        }

        static getAllOrders=async function(req,res){

            try {
                
            
            const clinicData=await reservationModel.find({UserId:req.user._id})
           
            
             resGenerator(res, 200, clinicData, "success")
            
            } catch (error) {
                resGenerator(res, 500, error, "err")
            }
            
            }
        




    }

module.exports=Reservation