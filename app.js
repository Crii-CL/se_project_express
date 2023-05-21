const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const helmet = require("helmet");
const cors = require("cors");
const routes = require("./routes");
const { validator } = require("./middlewares/validation");

const { PORT = 3001 } = process.env;
const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(routes);
app.use(validator);

app.listen(PORT, () => {});
