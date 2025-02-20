module.exports = function errorHandler(error, req, res, next) {
    let status = error.status || 500;

  console.log("masuk sini", error);
  
  
  switch (error.name) {
      case "InvalidInput":
          status = 400;
          message = "Email and password are required";
          break;
      case "SequelizeUniqueConstraintError":
      case "SequelizeValidationError":
          status = 400;
          message = error.errors[0].message;
          break;
      case "InvalidToken":
          status = 401;
          message = "Unauthenticated";
          break;
      case "EmailOrPasswordInvalid":
          status = 401;
          message = "Invalid email or password";
          break;
      case "EmailAlreadyUsed":
          status = 400;
          message = "Email is already in use";
          break;
      case "AllFieldsRequired":
          status = 400;
          message = "All fields are required";
          break;
      case "PasswordMinLength":
          status = 400;
          message = "Password must be at least 8 characters long";
          break;
      case "QuestionsNotFound":
        status = 404;
        message = "Questions not found";
        break;
  }
console.log(status, message);

  res.status(status).json({ message });

}

// module.exports = errorHandler;