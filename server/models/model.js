const Factory = require("./class");
let pool = require("../config");

class Model {
    static async createUser({ name, gender, email, password, role }) {
        try {
            const query = `INSERT INTO "Users" (name, gender, email, password, role) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
            const values = [name, gender, email, password, role];
            console.log("masuk sini", values);

            const { rows } = await pool.query(query, values);
            console.log(rows, "check rows");

            return Factory.create("Users", rows[0].id, rows[0].name, rows[0].gender, rows[0].email, rows[0].password, rows[0].role);
        } catch (error) {
            throw error;
        }
    }

    static async getUserByEmail(email) {
        try {
            const query = `SELECT * FROM "Users" WHERE email = $1`;
            const values = [email];
            const result = await pool.query(query, values);

            if (!result.rows[0]) return null;

            const user = result.rows[0];
            return Factory.create("Users", user.id, user.name, user.gender, user.email, user.password, user.role);
        } catch (error) {
            console.log(error, "error di get by email model");
            throw error;
        }
    }
    static async getUserById(id) {
        try {
            const query = `SELECT * FROM "Users" WHERE id = $1`;
            const values = [id];
            const result = await pool.query(query, values);

            if (!result.rows[0]) return null;

            const user = result.rows[0];
            return Factory.create("Users", user.id, user.name, user.gender, user.email, user.password, user.role);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    static async getAllStudents() {
        try {
            const query = `SELECT * FROM "Users" WHERE role = $1`;
            const values = [questionId];
            const result = await pool.query(query, values);            
            if (!result.rows[0]) return null;
            
            return Factory.create("Users", user.id, user.name, user.gender, user.email, user.password, user.role);
            } catch (error) {
            console.log(error);
            throw error;
        }
    }
    static async getAllQuestions(){
        try {
            const query = `SELECT * FROM "Questions"`;
            const result = await pool.query(query);
            if (!result.rows[0]) return null;
           return result.rows;
        } catch (error) {
            throw error;
        }
    }
    static async getQuestionsById(questionId){
        try {
            const query = `SELECT * FROM "Questions" WHERE id = $1`;
            console.log(questionId, "quesytion id");
            
            const value = [questionId]
            const result = await pool.query(query, value)
            if (!result.rows) return null;
            return result.rows;
        } catch (error) {
            throw error;
        }
    }
    static async getAnswerById(userId, questionId){
        try {
            const query = `SELECT * FROM "Answers" WHERE "userId" = $1 AND "questionId" = $2`
            const value = [userId, questionId]
            const result = await pool.query(query, value);
            if (!result.rows[0]) return null;
            return result.rows;
        } catch (error) {
            throw error
        }
    }
    static async getAnswerByIdUser(userId){
        try {
            console.log(userId, "userId di model getByUserId");
            const query = `SELECT * FROM "Answers" INNER JOIN "Questions" ON "Questions".id="Answers"."questionId" WHERE "userId" = $1`
            const value = [userId]
            const result = await pool.query(query, value);
            console.log(result, "hasil di getAnswerByIdUser");
            
            if (!result.rows[0]) return null;
            return result.rows;
        } catch (error) {
            console.log(error, "error di getAnswerByIdUser");
            
            throw error
        }
    }
    static async postAnswer(userId, questionId, answer) {
        try {
            console.log(answer ,"jawaban di postAnswer");
            
            const answerData = Factory.create("Answers", null, userId, questionId, answer, new Date(), new Date());
            console.log(answerData, "jawaban");
            
            
            const query = `
                INSERT INTO "Answers" ("userId", "questionId", answer, "createdAt", "updatedAt")
                VALUES ($1, $2, $3, $4, $5)
                RETURNING *;
            `;

            const values = [
                answerData.userId,
                answerData.questionId,
                answerData.answer,
                answerData.createdAt,
                answerData.updatedAt
            ];

            const result = await pool.query(query, values);
            return result.rows[0];
        } catch (error) {
            console.log(error, "error di postAnswer");
            
            throw new Error(`Error saving answer: ${error.message}`);
        }
    }
    static async putAnswer(id, answer) {
        try {
            const query = `
                UPDATE "Answers"
                SET answer = $1, "updatedAt" = NOW()
                WHERE id = $2
                RETURNING *;
            `;
            const values = [answer, id];
    
            const result = await pool.query(query, values);
            return result.rows[0];
        } catch (error) {
            console.log(error, "error di edit jawaban");
            
            throw new Error(`Error updating answer: ${error.message}`);
        }
    }
}

module.exports = Model;
