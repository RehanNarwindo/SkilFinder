const jwt = require("jsonwebtoken");
const key = process.env.JWT;
function createToken(data) {
  return jwt.sign(data, key);
}
function verifyToken(token) {
  return jwt.verify(token, key);
}

module.exports = { createToken, verifyToken };
