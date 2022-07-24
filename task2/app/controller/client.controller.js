const ClientModel = require("../../db/models/Client.model")
class Client{
    static home = async(req, res)=>{
        try{        
            const allClients = await ClientModel.find()
                res.render("home", {
                    pageTitle:"All Clients",
                    allClients,
                    isEmpty: !allClients.length
            })
        }
        catch(e){
            res.send(e.message)
        }
    }
    static addPost = (req, res)=>{
        res.render("addPost", { pageTitle:"Add Client" })
    }
    static addLogicPost = async(req,res)=>{
        try{
            const ClientData = new ClientModel(req.body)
            await ClientData.save()
            res.redirect("/")
        }
        catch(error){ 
         
            res.render("addPost", {
                error
            })
       
       // res.send(e.message)

    
    
    }
    }
    static single = async(req, res)=>{
        try{
            const result = await ClientModel.findById(req.params.id)
            res.render("single", {
                pageTitle:"Single Client",
                result
            })
        }
        catch(e){
           res.redirect("/dberror")

           
        }
    }
    static edit = async(req, res)=>{
        try{
            const result = await ClientModel.findById(req.params.id)
            res.render("edit", {
                pageTitle:"Single Client",
                result
            })
        }
        catch(e){
            res.redirect("/dberror")
        }
    }
    static editLogic= async(req,res)=>{
        // res.send({_id:req.params.id, ...req.body})
        try{
            let ClientData = await ClientModel.findById(req.params.id)
            
           // await ClientModel.findByIdAndUpdate(req.params.id, req.body, {runValidators:true})
            
            for (const property in req.body) {
                ClientData[property] = req.body[property]
            }
            await ClientData.save()
            res.redirect("/")
        }
        catch(e){
            res.send(e.message)
        }
    }
    static del = async(req, res)=>{
        try{
            const result = await ClientModel.findByIdAndDelete(req.params.id)
            res.redirect("/")
        }
        catch(e){
            res.redirect("/dberror")
        }
    }



    

    static addAddr = async(req, res)=>{
        try{
            const result = await ClientModel.findById(req.params.id)
            res.render("addAddr", {
                pageTitle:"addAddr",
                result
            })
        }
        catch(e){
            res.redirect("/dberror")

            
        }
    }

    static addBalance = async(req, res)=>{
        try{
            const result = await ClientModel.findById(req.params.id)
            res.render("addBalance", {
                pageTitle:"addBalance",
                result
            })
        }
        catch(e){
            res.redirect("/dberror")

            
        }
    }

    static addAddrLogicBalance = async(req,res)=>{
        try{
            const result = await ClientModel.findById(req.params.id)
            result.transactions.addBalance.push(req.body)


            await result.save()
            res.redirect("/")
        }
        catch(error){
         //  res.send(error)
          res.render("addBalance",{
                error
            })
         }
    
    }
  




    

static delAddr = async(req,res)=>{
    try{
        const result = await ClientModel.findOne({"transaction._id":req.params.id})
        result.transactions.withdraw.id(req.params.id).remove()
      
        await result.save()
        
        res.redirect("/")
    }
    catch(e){
        res.send(e.message)
    }

}


static delAddrAddBalance = async(req,res)=>{
    try{
        const result = await ClientModel.findOne({"transaction._id":req.params.id})
        result.transactions.addBalance.id(req.params.id).remove()
      
        await result.save()
        
        res.redirect("/")
    }
    catch(e){
        res.send(e.message)
    }

}


static addAddrLogic = async(req,res)=>{
    try{
      
        const result = await ClientModel.findById(req.params.id)
        result.transactions.withdraw.push(req.body)
        await result.save()
        res.redirect(`/single/${req.params.id}`)
    }
    catch(error){
     //  res.send(error)
      res.render("addAddr",{
            error
        })
     }

}

}
module.exports = Client