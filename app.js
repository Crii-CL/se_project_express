const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const cors = require("cors");
const routes = require("./routes");
const { validator } = require("./middlewares/errorHandler");
const { handleErrorMiddleware } = require("./middlewares/errorHandler");

const { PORT = 3001 } = process.env;
const app = express();
mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(routes);
// app.use(validator);
app.use(handleErrorMiddleware);

app.listen(PORT, () => {});
