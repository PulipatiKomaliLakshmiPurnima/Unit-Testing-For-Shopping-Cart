const express = require("express");
const {
  addProductInCart,
  quantityChange,
  deleteProductInCart,
} = require("../controllers/cartController");
const { isAuthenticatedUser } = require("../middleware/auth");

const router = express.Router();

router.route("/cart/:id").put(isAuthenticatedUser, addProductInCart);

router.route("/cart/quantity/:id").put(isAuthenticatedUser, quantityChange);

router.route("/cart/delete/:id").put(isAuthenticatedUser, deleteProductInCart);

module.exports = router;
