exports.index = function(req, res) {
  res.render('frontend/index');
}
exports.signup = function (req, res) {
  res.render("frontend/signup");
};
exports.signin = function (req, res) {
  res.render("frontend/signin");
};
