var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongodb = require("mongodb").MongoClient;
var mongoose = require("mongoose");
var nav = [
  { Text: "Books", Title: "books" },
  { Text: "Authors", Title: "author" }
];
const homeRoute = require("./routes/home.route")(nav);
var port = process.env.PORT || 3000;

// Middlewares
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.use(homeRoute);
app.get("/", (req, res) => {
  res.render("home");
});

// Server
app.listen(port || process.evn.PORT, function(err) {
  console.log("http://localhost:" + port + "/");
});
