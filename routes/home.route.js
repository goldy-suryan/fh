const express = require("express"),
  homeRoute = express.Router();

var route = function(nav) {
  homeRoute.route("/").get(function(req, res) {
    // var url = "mongodb://localhost:27017/books";
    // mongodb.connect(
    //   url,
    //   function(err, db) {
    //     var collection = db.collection("list");
    //     collection.insertMany(books, function(err, results) {
    //       res.json(results);
    //     });
    //   }
    // );
    res.render("home", { nav });
  });

  return homeRoute;
};

module.exports = route;
