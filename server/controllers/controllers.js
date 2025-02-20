const { comparePassword, hashPassword } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");
const Model = require("../models/model");

class Controller {
    static async login(req, res, next) {
        try {
            const { email, password } = req.body;
            console.log(email, "email");
            
            if (!email) {
                throw { name: "InvalidInput" };
            }
            if (!password) {
                throw { name: "InvalidInput" };
            }
            const user = await Model.getUserByEmail(email);
            console.log(user, "ini user di controller");
            
            if (!user) {
                throw { name: "EmailOrPasswordInvalid" };
            }
            const checkPassword = comparePassword(password, user.password);
            if (!checkPassword) {
                throw { name: "EmailOrPasswordInvalid" };
            }
            const data = {
                id: user.id,
                name: user.name,
                email: user.email,
            };
            console.log(data, "check data");

            const access_token = createToken(data);
            res.status(200).json({ access_token: access_token });
        } catch (error) {
            next(error)
        }
    }
  
    static async register(req, res, next) {
        try {
            const { name, gender, email, password, role } = req.body;
            if (!name || !gender || !email || !password || !role) {
                throw { name: "AllFieldsRequired" };
            }
            if (password.length < 8) {
                throw { name: "PasswordMinLength" };
            }

            const existingUser = await Model.getUserByEmail(email);
            if (existingUser) {
                throw { name: "EmailAlreadyUsed" };
            }

            const hashedPassword = await hashPassword(password);
            const newUser = await Model.createUser({
                name,
                gender,
                email,
                password: hashedPassword,
                role,
            });
            
            res.status(201).json({ message: "User registered successfully", user: newUser });
        } catch (error) {
            console.log(error, "errornya");
            
            next(error);
        }
    }
    static async getAllStudents(req, res, next) {
        try {
           const result = await Model.getAllStudents();
           console.log(result);
           res.status(200).json({ message: "get All students successfully", data: result });
        } catch (error) {
            next(error)
        }
    }
    static async getAllQuestions(req, res, next) {
        try {
           const result = await Model.getAllQuestions();
           console.log(result);
           res.status(200).json({ message: "get All questions successfully", data: result });
        } catch (error) {
            next(error)
        }
    }
    static async getQuestionsById(req, res, next) {
        try {
            const questionsId = Number(req.params.id);
            
           const result = await Model.getQuestionsById(questionsId);
           console.log(result);
           res.status(200).json({ message: "get All questions successfully", data: result });
        } catch (error) {
            console.log(error, "errornya");
            
            next(error)
        }
    }
    static async answerSubmit(req, res, next) {
        try {
            const questionId = req.params.id;
            const userId = req.user.id;
            const { answer } = req.body;

            console.log(questionId, "=====" ,answer ,"answer", userId);
            
           
           const question = await Model.getQuestionsById(questionId);
           if (!question) {
            throw { name: "QuestionsNotFound" };
            }
            let savedAnswer;
            const checkAnswer = await Model.getAnswerById(userId, questionId);
            if (checkAnswer) {
                savedAnswer = await Model.putAnswer(checkAnswer.id, answer);
                res.status(200).json({ message: "Answer updated successfully", data: savedAnswer });
            } else {
                savedAnswer = await Model.postAnswer(userId, questionId, answer);
                res.status(201).json({ message: "Answer submitted successfully", data: savedAnswer });
            }
            
        } catch (error) {
            next(error);
        }
    }
    static async getAnswerUser(req, res, next){
        try {
            const {id} = req.body
            const userAnswers = await Model.getAnswerByIdUser(id);
            console.log(userAnswers, "jawaban user");
            res.status(200).json({ message: "get Answer user successfully", data: userAnswers });

        } catch (error) {
            next(error)
        }
    }
}

module.exports = Controller;
