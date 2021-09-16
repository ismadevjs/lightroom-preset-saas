const { ObjectId } = require("mongodb");
const Item = require("../model/Item");
const usersCollection = require("../db").db().collection("users");
const categoriesCollection = require("../db").db().collection("categories");
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
    user: await usersCollection.findOne({
      _id: ObjectId(req.session.user._id),
    }),
  });
};
exports.becomeAnArtist = function (req, res) {
  res.render("frontend/become-artist");
};
exports.create = async function (req, res) {
  res.render("frontend/create", {
    categories: await categoriesCollection.find().toArray(),
  });
};
exports.createPost = function (req, res) {
  let item = new Item(req.body, req.files);
  item
    .create()
    .then(() => {
      req.flash("message", "item added successfully");
      req.session.save(() => {
        res.redirect("/create");
      });
    })
    .catch((e) => {
      req.flash("message", e);
      req.session.save(() => {
        res.redirect("/create");
      });
    });
};
