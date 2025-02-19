const pool = require("./config");

const dropTable = `DROP TABLE IF EXISTS "Results", "Answers", "Rules", "Questions", "Users"`;

const queryTableUsers = `CREATE TABLE IF NOT EXISTS "Users" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    gender VARCHAR(10) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role VARCHAR(50) NOT NULL,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;

const queryTableQuestions = `CREATE TABLE IF NOT EXISTS "Questions" (
    id SERIAL PRIMARY KEY,
    question TEXT NOT NULL,
    category VARCHAR(100) NOT NULL,
    "isUsed" Boolean NOT NULL,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;

const queryTableRules = `CREATE TABLE IF NOT EXISTS "Rules" (
    id SERIAL PRIMARY KEY,
    condition TEXT NOT NULL,
    conclusion TEXT NOT NULL,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;

const queryTableAnswers = `CREATE TABLE IF NOT EXISTS "Answers" (
    id SERIAL PRIMARY KEY,
    "userId" INT REFERENCES "Users"(id) ON DELETE CASCADE,
    "questionId" INT REFERENCES "Questions"(id) ON DELETE CASCADE,
    answer TEXT NOT NULL,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;

const queryTableResults = `CREATE TABLE IF NOT EXISTS "Results" (
    id SERIAL PRIMARY KEY,
    "userId" INT REFERENCES "Users"(id) ON DELETE CASCADE,
    talent VARCHAR(100) NOT NULL,
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP

)`;

async function createTable() {
  try {
    await pool.query(dropTable);
    console.log("Drop table success");

    await pool.query(queryTableUsers);
    console.log("Create table Users success");

    await pool.query(queryTableQuestions);
    console.log("Create table Questions success");

    await pool.query(queryTableRules);
    console.log("Create table Rules success");

    await pool.query(queryTableAnswers);
    console.log("Create table Answers success");

    await pool.query(queryTableResults);
    console.log("Create table Results success");
  } catch (error) {
    console.error("Error creating tables:", error);
  }
}

// createTable();