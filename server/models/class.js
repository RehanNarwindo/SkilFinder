class Users {
    constructor(id, name, gender, email, password, role) {
      this.id = id;
      this.name = name;
      this.gender = gender;
      this.email = email;
      this.password = password;
      this.role = role;
    }
  }
  
  class Questions {
    constructor(id, question, category) {
      this.id = id;
      this.question = question;
      this.category = category;
    }
  }
  
  class Rules {
    constructor(id, condition, conclusion) {
      this.id = id;
      this.condition = condition;
      this.conclusion = conclusion;
    }
  }
  
  class Answers {
    constructor(id, userId, questionId, answer) {
      this.id = id;
      this.userId = userId;
      this.questionId = questionId;
      this.answer = answer;
    }
  }
  
  class Result {
    constructor(id, userId, talent, createdAt = new Date()) {
      this.id = id;
      this.userId = userId;
      this.talent = talent;
      this.createdAt = createdAt;
    }
  }

  class Factory {
    static create(type, ...params) {
        switch (type) {
            case "Users":
                return new Users(...params);
            case "Questions":
                return new Questions(...params);
            case "Rules":
                return new Rules(...params);
            case "Answers":
                return new Answers(...params);
            case "Result":
                return new Result(...params);
            default:
                throw new Error("Invalid type for Factory creation");
        }
    }
}

module.exports = Factory;