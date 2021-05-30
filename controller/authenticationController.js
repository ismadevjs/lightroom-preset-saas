const User = require("../model/User");
exports.signupPost = function (req, res) {
  const user = new User(req.body);
  user
    .register()
    .then((r) => res.redirect("/signin"))
    .catch((e) => {
      req.flash("message", e);
      req.session.save(() => {
        res.redirect("/signup");
      });
    });
};
exports.signinPost = function (req, res) {
  const user = new User(req.body);
  user
    .login()
    .then((r) => {
      req.session.user = { _id: r._id, username: r.username, email: r.email };
      req.flash("message", "Welcome Back!");
      req.session.save(() => {
        res.redirect("/");
      });
    })
    .catch((e) => {
      req.flash("message", e);
      req.session.save(() => {
        res.redirect("/signin");
      });
    });
};
