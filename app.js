const express = require("express");
const mongoose = require("mongoose");
const app = express();

const { PORT = 3001 } = process.env;

app.listen(PORT, () => {
  console.log("App listening on port 3001");
});

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db"); //wtwr_db is the name of the database you connect to. However, you can choose your own database name, if you prefer.
