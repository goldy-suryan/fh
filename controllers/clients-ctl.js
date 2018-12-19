const Client = require("../models/clients");
const fs = require("fs");
const path = require("path");

const clientCtrl = {
  getClients: (req, res) => {
    Client.find((err, result) => {
      if (err) {
        req.flash("message", err);
        res.redirect(req.headers.referer);
      }
      if (result) {
        res.render("dashboard-clients", {
          message: req.flash("message"),
          result: result
        });
      }
    });
  },

  postClients: (req, res) => {
    const client = new Client({
      name: req.body.name,
      title: req.body.title
    });
    if (req.file && req.file.path) {
      client.image = req.file.originalname;
    }

    client.save((err, result) => {
      if (err) {
        req.flash("message", err);
        res.redirect("/login/clients");
      }
      if (result) {
        req.flash("message", "Saved successfully");
        res.redirect("/login/clients");
      }
    });
  },

  deleteClient: (req, res) => {
    Client.findOneAndDelete({ _id: req.params.id }, (err, result) => {
      if (err) {
        req.flash("message", err);
        res.redirect("/login/clients");
      }
      if (!result) {
        req.flash("message", "No data with requested id");
        res.redirect("/login/clients");
      }
      if (result) {
        req.flash("message", "Data deleted successfully");
        fs.unlink(
          path.join(
            __dirname,
            "..",
            "public",
            "images",
            "clients",
            `${result.image}`
          ),
          err => {
            if (err) {
              res.redirect("/login/clients");
            } else {
              res.redirect("/login/clients");
            }
          }
        );
      }
    });
  }
};

module.exports = clientCtrl;
