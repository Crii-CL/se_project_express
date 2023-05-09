const http = require("http");
const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/users");
const path = require("path");
const clothingItemsRoutes = require("./routes/clothingItems");
const errors = require("./utils/errors");

const { PORT = 3001 } = process.env;
const app = express();

//wtwr_db is the name of the database you connect to. However, you can choose your own database name, if you prefer.
mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: "6459510221fc6a6cb7c9ee59",
  };
  next();
});

app.use((err, req, res, next) => {
  if (err) {
    console.error(err);
    let serverStatus = errors.SERVER_ERROR;
    let message = "An error has occurred on the server. APP.JS CODE";

    if (err.name === "ValidationError" || err.name === "CastError") {
      serverStatus = errors.BAD_REQUEST;
      message = "Invalid data passed to the method.";
    } else if (err.name === "NotFound") {
      serverStatus = errors.NOT_FOUND;
      message = "Item not found.";
    }

    return res.status(serverStatus).json({ message });
  }

  next();
});

// app.use("/users", userRoutes);
// app.use("/clothingItems", clothingItemsRoutes);

app.use(express.static(path.join(__dirname, "public")));
app.listen(PORT, () => {
  console.log("App listening on port 3001");
  console.log("---------------------------------");
});

//move the app.uses to index.js and do router.use in here (watch vishal's video)
