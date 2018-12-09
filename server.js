var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("express-flash");
const favicon = require("serve-favicon");
const homeRoute = require("./routes/home.route");
const offerRoute = require("./routes/offer.route");
const galleryRoute = require("./routes/gallery.route");
const aboutRoute = require("./routes/about.route");
const contactRoute = require("./routes/contact.route");
const bookingRoute = require("./routes/booking.route");
const enquiryRoute = require("./routes/enquiry.route");
const loginRoute = require("./routes/login.route");
var port = process.env.PORT || 8000;
const config = require("./config");

// Database connection
mongoose.connect(
  config.mongoURI,
  { useNewUrlParser: true }
);

// Middlewares
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(favicon(path.join(__dirname, "public", "images", "favicon.ico")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({
    secret: "himanshu-nakul",
    resave: false,
    saveUninitialized: true
  })
);
app.use(flash());

app.disable("x-powered-by");
app.use((req, res, next) => {
  res.header("Allow-Access-Control-Origin", "*");
  res.header(
    "Allow-Access-Control-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "POST, PUT, DELETE, PATCH, GET");
    res.status(200).json({});
  }
  next();
});

// Routes
app.use("/", homeRoute);
app.use("/about", aboutRoute);
app.use("/contact", contactRoute);
app.use("/offers", offerRoute);
app.use("/gallery", galleryRoute);
app.use("/booking", bookingRoute);
app.use("/enquiry", enquiryRoute);
app.use("/login", loginRoute);
app.get("/logout", (req, res) => {
  res.clearCookie("auth");
  res.redirect("/login");
});
app.get("*", (req, res) => {
  res.render("notFound");
});

// Error Handeling
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    error: {
      message: err.message
    }
  });
});

// Server
app.listen(port || process.evn.PORT, function(err) {
  console.log("http://localhost:" + port + "/");
});
