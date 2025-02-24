const express = require("express");
const route = express.Router();
const Controller = require("../controllers/controllers")
const authentication = require("../middlewares/authentication")

route.post("/login", Controller.login)
// route.get("/login", (req, res)=> {
//     res.send("masuk login")
// })
route.post("/register", Controller.register)
route.use(authentication)
route.get("/getAllStudents", Controller.getAllStudents)
route.get("/getAllQuestions", Controller.getAllQuestions)
route.get("/getQuestionsById/:id", Controller.getQuestionsById)
route.get("/getAnswerUser", Controller.getAnswerUser)
route.post("/answerSubmit/:id", Controller.answerSubmit);



// route.get("/home", Controller.home)



module.exports = route;
