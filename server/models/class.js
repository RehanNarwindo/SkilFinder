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
            console.log(error);
            throw error;
        }
    }
}

module.exports = Model;
