require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const cors = require("cors");
const { errors } = require("celebrate");
const routes = require("./routes");
const { handleErrorMiddleware } = require("./middlewares/errorHandler");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const allowedOrigins = ["https://main--stellar-cascaron-f6fdcc.netlify.app"];
const { PORT = 3001 } = process.env;
const app = express();

mongoose.connect(process.env.MONGODB_URI);

app.use(express.json());

app.use(helmet());

app.use(cors(allowedOrigins));

app.use(requestLogger);

app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});

app.use(routes);

app.use(errorLogger);

app.use(errors());

app.use(handleErrorMiddleware);

app.use((err, req, res, next) => {
  console.error(err);
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? "An error occurred on the server" : message,
  });
});

app.listen(PORT, () => {});
