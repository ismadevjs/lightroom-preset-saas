const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const specialPages = require("./controller/specialPages");
const frontendController = require("./controller/frontendController");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); //Appending extension
  },
});
const upload = multer({ storage: storage });
// frontend area
router.get("/", function (req, res) {
  res.send("hello from github");
});

router.get("/signup", frontendController.signup);
router.get("/404", specialPages.errorPage);

module.exports = router;
