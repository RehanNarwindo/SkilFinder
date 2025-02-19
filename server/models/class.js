class Users {
    constructor(id, name, gender, email, password, role, createdAt, updatedAt) {
      this.id = id;
      this.name = name;
      this.gender = gender;
      this.email = email;
      this.password = password;
      this.role = role;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
    }
  }
  
  class Questions {
    constructor(id, question, category, createdAt, updatedAt) {
      this.id = id;
      this.question = question;
      this.category = category;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
    }
  }
  
  class Rules {
    constructor(id, condition, conclusion, createdAt, updatedAt) {
      this.id = id;
      this.condition = condition;
      this.conclusion = conclusion;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
    }
  }
  
  class Answers {
    constructor(id, userId, questionId, answer, createdAt, updatedAt) {
      this.id = id;
      this.userId = userId;
      this.questionId = questionId;
      this.answer = answer;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
    }
  }
  
  class Result {
    constructor(id, userId, talent, createdAt, updatedAt = new Date()) {
      this.id = id;
      this.userId = userId;
      this.talent = talent;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
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