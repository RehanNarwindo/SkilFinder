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
    static async answerSubmit(req, res, next){
        try {
            const list = await Model.getAllQuestions();
            console.log(list, "list pertanyaan");
            res.status(200).json({ message: "get All questions successfully", data: list });

            
        } catch (error) {
            next(error)
        }
    }
}

module.exports = Controller;
