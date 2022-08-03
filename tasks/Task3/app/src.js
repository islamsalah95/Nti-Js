require('dotenv').config()
require("../db/connect")
const express = require("express")
const hbs = require("hbs")
const path = require("path")
const app = express()

app.use(express.urlencoded({extended:true}))

app.use(express.static(path.join(__dirname, "../resources/public")))
app.set("view engine", "hbs")
app.set("views" , path.join(__dirname, "../resources/views"))
hbs.registerPartials(path.join(__dirname, "../resources/layouts"))

const ClientRoutes = require("../routes/client.routes")//routes
app.use(ClientRoutes)//routes

app.all("*", (req,res)=> res.render("err404", {pageTitle:"page not found"}))
module.exports = app