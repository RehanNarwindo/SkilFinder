require("dotenv").config();

const express = require("express");

const port = process.env.port || 3000;
const app = express();
const index = require("./routes/index");
const errorHandler = require("./middlewares/errorHandler");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/", index);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

module.exports = app;
