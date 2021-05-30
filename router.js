const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const specialPages = require("./controller/specialPages");
const frontendController = require("./controller/frontendController");
const authenticationController = require("./controller/authenticationController");
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
router.get("/", frontendController.index);
router.get("/signup", frontendController.signup);
router.post("/signup", authenticationController.signupPost);
router.get("/signin", frontendController.signin);
router.post("/signin", authenticationController.signinPost);
router.get("/404", specialPages.errorPage);
router.get("/logout", authenticationController.logout);
module.exports = router;
