const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.cookies.auth;
    if (token) {
      jwt.verify(token, "secret", function(err, token_data) {
        if (err) {
          res.redirect("/login");
          return;
          //   return res.status(403).json({ message: "Error" });
        } else {
          req.user_data = token_data;
          next();
        }
      });
    } else {
      res.redirect("/login");
      return;
    }
  } catch (error) {
    res.redirect("/login");
    return;
    // return res.status(403).json({ message: "Error" });
    // res.status(401).json({
    //   message: "Authorization failed"
    // });
  }
};
