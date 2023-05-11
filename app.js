const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const helmet = require("helmet");
const routes = require("./routes");
const validator = require("./middlewares/validation");

const { PORT = 3001 } = process.env;
const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");

app.use(express.json());
app.use(helmet());
app.use((req, res, next) => {
  req.user = {
    _id: "6459510221fc6a6cb7c9ee59",
  };
  next();
});
app.use(routes);

app.use(validator);

app.use(express.static(path.join(__dirname, "public")));
app.listen(PORT, () => {});
