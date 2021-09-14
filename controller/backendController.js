const Category = require("../model/Category");
const Page = require("../model/Page");
const categoryCollection = require("../db").db().collection("categories");
const pagesCollection = require("../db").db().collection("pages");

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
exports.becomeAnArtist = async function (req, res) {
  res.render("backend/become-an-artist", {
    pages: await pagesCollection.findOne(),
  });
};
exports.becomeAnArtistPost = function (req, res) {
  const page = new Page(req.body, req.session.user._id);
  page
    .becomeArtist()
    .then(() => {
      req.flash("message", "Page Updated!");
      req.session.save(() => {
        res.redirect("/control/become-an-artist");
      });
    })
    .catch((e) => {
      req.flash("message", e);
      req.session.save(() => {
        res.redirect("/control/become-an-artist");
      });
    });
};
exports.pages = async function (req, res) {
  res.render("backend/pages", {
    pages: await pagesCollection.find().skip(1).toArray(),
  });
};
exports.addPage = function (req, res) {
  res.render("backend/add-page");
};
exports.AddPagePost = function (req, res) {
  let page = new Page(req.body);
  page
    .create()
    .then(() => {
      req.flash("message", "Page added");
      req.session.save(() => {
        res.redirect("/control/pages");
      });
    })
    .catch((e) => {
      req.flash("message", e);
      req.session.save(() => {
        res.redirect("/control/pages");
      });
    });
};
