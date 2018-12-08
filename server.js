var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
const path = require("path");
const favicon = require("serve-favicon");
const homeRoute = require("./routes/home.route");
const offerRoute = require("./routes/offer.route");
const galleryRoute = require("./routes/gallery.route");
var port = process.env.PORT || 8000;
const bookingCtrl = require("./routes/test.route");
// Database connection
mongoose.connect(
  "mongodb://goldy:goldy@test-shard-00-00-ifhka.mongodb.net:27017,test-shard-00-01-ifhka.mongodb.net:27017,test-shard-00-02-ifhka.mongodb.net:27017/test?ssl=true&replicaSet=test-shard-0&authSource=admin&retryWrites=true",
  { useNewUrlParser: true }
);

// Middlewares
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(favicon(path.join(__dirname, "public", "images", "favicon.ico")));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.use("/", homeRoute);

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});
app.use("/offers", offerRoute);
app.use("/gallery", galleryRoute);
app.post("/booking", bookingCtrl.addBooking);

// Server
app.listen(port || process.evn.PORT, function(err) {
  console.log("http://localhost:" + port + "/");
});
