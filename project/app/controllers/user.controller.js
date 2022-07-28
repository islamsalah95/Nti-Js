const userModel=require("../db/models/user.model")
const clinicModel=require("../db/models/clinic.model")
const {resGenerator} = require("../helpers/methods")
const otpp=require("otp-generator")
const nodemailer = require("nodemailer");
const send = require("../helpers/email.helper")


class User{
    static login=async function(req,res){


        try{
            const userData = await userModel.loginUser(req.body.email, req.body.password)
           // if(!userData.status) return resGenerator(res, 500, {otp: userData.otp}, "activate first")
            const token = await userData.generateToken()
            resGenerator(res, 200, {user:userData, token}, "registered")
        }catch (error) {
            resGenerator(res, 500, error, "err")
        }
        
        
        
        }


        static logout=async function(req,res){

            
            try{
                req.user.tokens = []
                await req.user.save()
              
            
              
                res.send({apiStatus:true, data: req.user, message:"logged out all"})
                        }catch (error) {
                resGenerator(res, 500, error, "err")
            }
            
            
            
            }



static register=async function(req,res){

try {
    
const userData=new userModel(req.body)


 await userData.save()

 resGenerator(res, 200, userData, "success")

} catch (error) {
    resGenerator(res, 500, error, "err")
}



}



    static activate = async(req, res)=>{
        try{
            const userData = await userModel.loginUser(req.body.email, req.body.password)
            if(userData.status) throw new Error("already active")
            if(userData.otp!=req.body.otp) throw new Error("invalid otp")
            userData.status=true
            userData.otp=null
            await userData.save()
            resGenerator(res, 200, userData, "ACTIVATED")
        }
        catch(e){
            resGenerator(res, 500, e.message, "cann't activate user")
        }
    } 




    static forget = async(req, res)=>{
        try{
            const userData = await userModel.findOne({email:req.body.email})
            const newOtp=otpp.generate(6, { upperCaseAlphabets: false, specialChars: false })
             userData.otp=newOtp
            ///////////////////////////////////////////////////////////
            // var transport = nodemailer.createTransport({
            //     host: "smtp.mailtrap.io",
            //     port: 587 ,
            //     auth: {
            //       user:"d51653207306a0",
            //       pass:"0d9ca46dfa6f34"
            //     }
            //   });
              
            
              
            //   var mailOptions = {
            //     from: '"Example Team" <from@ourProject.com>',
            //     to: req.body.email,
            //     subject:"otp",
            //     text: newOtp,
            //     html: newOtp,
               
            //   };
              
            //   transport.sendMail(mailOptions, (error, info) => {
            //     if (error) {
            //       return console.log(error);
            //     }
            //     console.log('Message sent: %s', info.messageId);
            //   });
            ////////////////////////////////////////////////////////////        
            userData.save()

            resGenerator(res, 200, userData, "success")
        }
        catch(e){
            resGenerator(res, 500, e, "err")
        }
    } 
    



    static updatePass=async function(req,res){


        try{
            const userData = await userModel.findOne({otp:req.body.otp})
            if(!userData) throw new Error("invalid otp")
            userData.password=req.body.password
            userData.otp=null
            userData.save()
           
           
           
           
           resGenerator(res, 200,userData, "done")
        } catch (error) {
            resGenerator(res, 500, error, "err")
        }
        
        
        
        }

////////////////////////admin//////////////////////////
    
static adminAddDoctors=async function(req,res){

    try {
        
    if (req.body.type!="doctor") {
       
        throw new Error("not add type doctor")

    }
    
    const userData=new userModel(req.body)
    await userData.save()
    
     resGenerator(res, 200, userData, "success")
    
    } catch (error) {
        resGenerator(res, 500, error, "err")
    }
    
    }

    
    
    static getAllDoctors=async function(req,res){

        try {
            
        const userData=await userModel.find({type:"doctor"})
        
         resGenerator(res, 200, userData, "success")
        
        } catch (error) {
            resGenerator(res, 500, error, "err")
        }
        
        }
    
    


        

}

module.exports=User