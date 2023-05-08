const http = require("http");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("mongoose");
const userRoutes = require("./routes/users");
const path = require("path");
const clothingItemsRoutes = require("./routes/clothingItems");

const { PORT = 3001 } = process.env;
const app = express();

//wtwr_db is the name of the database you connect to. However, you can choose your own database name, if you prefer.
mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");

app.use("/users", userRoutes);
app.use("./routes/clothingItems", clothingItemsRoutes);

app.use((req, res, next) => {
  req.user = {
    _id: "",
  };
  next();
});

app.use(express.static(path.join(__dirname, "public")));
app.listen(PORT, () => {
  console.log("App listening on port 3001");
});
