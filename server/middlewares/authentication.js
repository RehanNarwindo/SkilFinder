const { verifyToken } = require("../helpers/jwt");
const Model = require("../models/model")

module.exports = async function authentication(req, res, next) {
    try {
        console.log("masuk authentic rrr");
        
        let access_token = req.headers.authorization;

        if (!access_token) {
            throw { name: "Invalid Token" };
        }

        let [bearer, token] = access_token.split(" ");
        if (bearer !== "Bearer" || !token) {
            throw { name: "Invalid Token" };
        }

        let verified = verifyToken(token);
        if (!verified) {
            throw { name: "Invalid Token" };
        }

        let user = await User.findByPk(verified.id);
        if (!user) {
            throw { name: "Invalid Token" };
        }

        req.user = {
            id: user.id,
            email: user.email,
        };

        next();
    } catch (error) {
        next(error); // Mengirim error ke error handler global
    }
};
