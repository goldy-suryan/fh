const Enquiry = require("../models/enquiry");

const enquiryCtrl = {
  getEnquiry: (req, res) => {
    Enquiry.find((err, result) => {
      if (err) {
        req.flash("message", err);
        res.redirect(req.headers.referer);
      } else {
        res.render("dashboard-enquiry", {
          result: result,
          message: req.flash("message")
        });
      }
    });
  },

  deleteEnquiry: (req, res) => {
    Enquiry.findByIdAndDelete({ _id: req.params.id }, (err, result) => {
      if (err) {
        req.flash("message", err);
        res.redirect("/login/enquiry");
      }
      if (result) {
        req.flash("message", "Deleted successfully");
        res.redirect("/login/enquiry");
      }
    });
  }
};

module.exports = enquiryCtrl;
