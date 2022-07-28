const router = require("express").Router()
const taskController = require("../controllers/task.controller")
const {auth, authAdmin} = require("../middleware/auth.middleware")

router.post("/addTask",auth, taskController.addTask)
router.get("/showUser",auth, taskController.showUser)
router.get("/showAdminTasks",authAdmin, taskController.showAdminTasks)
router.get("/assignToUser",authAdmin, taskController.assignToUser)


module.exports=router