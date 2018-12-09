const express = require("express"),
  enquiryRoute = express.Router(),
  Enquiry = require("../models/enquiry");

enquiryRoute.post("/", (req, res) => {
  const enquiry = new Enquiry({
    name: req.body.name,
    email: req.body.email,
    subject: req.body.subject,
    message: req.body.message
  });
  if (req.body.name && req.body.email && req.body.subject && req.body.message) {
    enquiry.save((err, result) => {
      if (err) {
        res.status(500).json({ error: err });
      } else {
        req.flash("info", "Message sent successfully");
        res.redirect(req.headers.referer);
      }
    });
  } else {
    res.json({ message: "please fill all the fields" });
  }
});

module.exports = enquiryRoute;
