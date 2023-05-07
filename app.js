const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("mongoose");
const userRoutes = require("./routes/users");
const clothingItemsRoutes = require("./routes/clothingItems");

const { PORT = 3001, BASE_PATH } = process.env;
const app = express();

//wtwr_db is the name of the database you connect to. However, you can choose your own database name, if you prefer.
mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("./routes/users", userRoutes);
app.use("./routes/clothingItems", clothingItemsRoutes);

app.use(express.static(path.join(__dirname, "public")));
app.listen(PORT, () => {
  console.log("App listening on port 3001");
  console.log(BASE_PATH);
});
