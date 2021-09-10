const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const specialPages = require("./controller/specialPages");
const frontendController = require("./controller/frontendController");
const authenticationController = require("./controller/authenticationController");
const backendController = require("./controller/backendController");
const middleware = require("./middleware/authentication");
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
router.get("/profile", frontendController.profile);
router.post("/settings", authenticationController.settings);
router.post("/change-password", authenticationController.changePassword);
router.post(
  "/update-avatar-image",
  upload.single("avatar"),
  authenticationController.updateAvatarImage
);
router.get("/become-an-artist", frontendController.becomeAnArtist);
// backend area
router.get("/control", middleware.checkifAdmin, backendController.control); // admin
router.get(
  "/control/categories",
  middleware.checkifAdmin,
  backendController.categories
);
router.post(
  "/add-category",
  middleware.checkifAdmin,
  backendController.categoryAdd
);
router.get(
  "/category-delete-" + ":id",
  middleware.checkifAdmin,
  backendController.categoryDeleteByOne
);
router.post(
  "/category-update/:id",
  middleware.checkifAdmin,
  backendController.categoryUpdate
);
router.get(
  "/control/become-an-artist",
  middleware.checkifAdmin,
  backendController.becomeAnArtist
);
router.post(
  "/control/become-an-artist",
  middleware.checkifAdmin,
  backendController.becomeAnArtistPost
);
module.exports = router;
