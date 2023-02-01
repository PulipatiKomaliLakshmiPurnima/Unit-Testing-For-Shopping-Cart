const express = require("express");
const {
  addProductInFavourite,
  deleteProductInFavourite,
} = require("../controllers/favouriteController");
const { isAuthenticatedUser } = require("../middleware/auth");
const router = express.Router();

router.route("/favourite/:id").put(isAuthenticatedUser, addProductInFavourite);
router
  .route("/favourite/delete/:id")
  .put(isAuthenticatedUser, deleteProductInFavourite);

module.exports = router;
