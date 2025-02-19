const pool = require("./config");

const dataQuestions = require("./data/questions.json")
  .map((el) => {
    const { question, category, isUsed } = el;
    return `('${question}', '${category}', '${isUsed}')`;
  })
  .join(", \n");

  const queryQuestions = `insert into "Questions"("question", "category", "isUsed")
  values ${dataQuestions}`;
  
async function seedQuestions() {
    try {
      let data = await pool.query(queryQuestions);
      if (data) console.log("seeding Questions berhasil");
    } catch (error) {
      console.log(error);
    }
  }

  // seedQuestions()