const { ObjectId } = require("bson");
const usersCollection = require("../db").db().collection("users");
exports.index = function (req, res) {
  res.render("frontend/index");
};
exports.signup = function (req, res) {
  res.render("frontend/signup");
};
exports.signin = function (req, res) {
  res.render("frontend/signin");
};
exports.profile = async function (req, res) {
  res.render("frontend/profile", {
    user : await usersCollection.findOne({_id : ObjectId(req.session.user._id)})
  });
};
