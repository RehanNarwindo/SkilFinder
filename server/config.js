const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  password: "Startmeup",
  host: "localhost",
  port: 5432,
  database: "SkillFinderDB",
  idleTimeoutMillis: 300,
});

async function createDB() {
  try {
    console.log(await pool.query("SELECT NOW()"));
    console.log("berhasil buat database SkillFinderDB");
  } catch (error) {
    console.log(error);
  }
}

// createDB();
module.exports = pool;
