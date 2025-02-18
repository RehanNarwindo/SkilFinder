const express = require("express");
const route = express.Router();
const Controller = require("../controllers/controllers")
const authentication = require("../middlewares/authentication")
// const errorHandler = require("../middlewares/errorHandler")

route.post("/login", Controller.login)
// route.get("/login", (req, res)=> {
//     res.send("masuk login")
// })
route.post("/register", Controller.register)
route.use(authentication)
route.get("/getAllStudents", Controller.getAllStudents)

// route.get("/home", Controller.home)



module.exports = route;
