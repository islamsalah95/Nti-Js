const router = require("express").Router()
const Client = require("../app/controller/client.controller")

router.get("/", Client.home)

router.get("/add", Client.addPost)
router.post("/addLogic", Client.addLogicPost)

router.get("/single/:id", Client.single)

router.get("/delete/:id", Client.del)

router.get("/edit/:id", Client.edit)
router.post("/edit/:id", Client.editLogic)
router.get("/addAddr/:id", Client.addAddr)


router.post("/addAddr/:id", Client.addAddrLogic)



router.get("/addBalance/:id", Client.addBalance)
router.post("/addAddrLogicBalance/:id", Client.addAddrLogicBalance)


router.get("/delAddr/:id", Client.delAddr)
router.get("/delAddrAddBalance/:id", Client.delAddrAddBalance)




module.exports=router