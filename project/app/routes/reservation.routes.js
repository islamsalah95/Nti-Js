const router = require("express").Router()
const {auth, authAdmin,doctors} = require("../middleware/auth.middleware")
const reservation = require("../controllers/reservation.controller")

router.post("/appointment",auth, reservation.appointment)
router.get("/getAllOrders",auth, reservation.getAllOrders)









module.exports=router

