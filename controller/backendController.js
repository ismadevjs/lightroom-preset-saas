const Category = require("../model/Category");
const categoryCollection = require("../db").db().collection("categories");
exports.control = function (req, res) {
  res.render("backend/index");
};
exports.categories = async function (req, res) {
  res.render("backend/categories", {
    categories: await categoryCollection.find().toArray(),
  });
};
exports.categoryAdd = function (req, res) {
  const category = new Category(req.body);
  category
    .add()
    .then(() => {
      req.flash("message", "Category Added!");
      req.session.save(() => {
        res.redirect("/control/categories");
      });
    })
    .catch((e) => {
      req.flash("message", e);
      req.session.save(() => {
        res.redirect("/control/categories");
      });
    });
};
exports.categoryDeleteByOne = function (req, res) {
  const category = new Category(req.params.id);
  category
    .deleteByOne()
    .then(() => {
      req.flash("message", "Category Deleted!");
      req.session.save(() => {
        res.redirect("/control/categories");
      });
    })
    .catch((e) => {
      req.flash("message", e);
      req.session.save(() => {
        res.redirect("/control/categories");
      });
    });
};
exports.categoryUpdate = function (req, res) {
  const category = new Category(req.body, req.params.id);
  category
    .deleteByOne()
    .then(() => {
      req.flash("message", "Category Updated!");
      req.session.save(() => {
        res.redirect("/control/categories");
      });
    })
    .catch((e) => {
      req.flash("message", e);
      req.session.save(() => {
        res.redirect("/control/categories");
      });
    });
};
exports.becomeAnArtist = function (req, res) {
  res.render("backend/become-an-artist");
};
