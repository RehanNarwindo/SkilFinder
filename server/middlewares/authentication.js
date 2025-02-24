const { verifyToken } = require("../helpers/jwt");
const Model = require("../models/model")

module.exports = async function authentication(req, res, next) {
    try {
        console.log("masuk authentic rrr");
        
        let access_token = req.headers.authorization;
        console.log(access_token, "akses tokennya");
        

        if (!access_token) {
            throw { name: "InvalidToken" };
        }

        let [bearer, token] = access_token.split(" ");
        if (bearer !== "Bearer" || !token) {
            throw { name: "InvalidToken" };
        }

        let verified = await verifyToken(token);
        if (!verified) {
            throw { name: "InvalidToken" };
        }
        console.log(verified, "verifed");
        

        let user = await Model.getUserById(verified.id);
        if (!user) {
            throw { name: "InvalidToken" };
        }
        console.log(user, "user");
        

        req.user = {
            id: user.id,
            name: user.name,
            email: user.email,
        };

        next();
    } catch (error) {
        next(error); 
    }
};
