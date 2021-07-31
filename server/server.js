const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const router = require("./routes.js");
const port = process.env.PORT || 5000;
const app_name = `User Management System`;

// * parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// * parse application/json
app.use(bodyParser.json());

// EJS
app.set("view engine", "ejs");

// * Connection to MongoDB
mongoose
  .connect(
    "mongodb+srv://MyUsername:MyPassword@mycluster.rkncu.mongodb.net/USER_MANAGEMENT?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
  )
  .then(() => console.log("\x1b[34m", "MongoDB Connected"))
  .catch((err) => console.log(err));

// * routes
console.log("Routes initializing");
app.use("/", router);
app.get("*", (req, res) => {
  res.render("404/404.ejs");
});

app.listen(port, () => {
  console.log(`${app_name} listening at http://localhost:${port}`);
});
