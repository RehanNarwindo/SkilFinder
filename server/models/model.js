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
            
            console.log(rows, "test row");

            return rows[0];
        } catch (error) {
            throw error;
        }
    }

    static async getUserByEmail(email) {
        try {
            const query = `SELECT * FROM "Users" WHERE email = $1`;
            const values = [email];
            console.log(email, "terst ");
            
            const result = await pool.query(query, values);
            console.log(result, "ini result ");
            
            return result.rows[0];
        } catch (error) {
            console.log(error);
            
            throw error;
        }
    }
}

module.exports = Model;
