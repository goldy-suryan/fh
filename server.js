var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongodb = require("mongodb").MongoClient;
var mongoose = require("mongoose");
const homeRoute = require("./routes/home.route");
var port = process.env.PORT || 8000;

// Middlewares
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.use("/", homeRoute);

app.get("/about", (req, res) => {
  res.render("about");
});

// Server
app.listen(port || process.evn.PORT, function(err) {
  console.log("http://localhost:" + port + "/");
});
