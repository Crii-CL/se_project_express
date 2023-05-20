const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const helmet = require("helmet");
const routes = require("./routes");
const { validator } = require("./middlewares/validation");
const cors = require("cors");

const { PORT = 3001 } = process.env;
const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(routes);
app.use(validator);
app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => {});
