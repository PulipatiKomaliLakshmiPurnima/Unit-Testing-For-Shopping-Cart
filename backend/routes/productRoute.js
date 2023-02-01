const express = require("express");
const {getAllProducts,getProductDetails,filterProducts} = require("../controllers/productController");

const router = express.Router();

router.route("/products").get(getAllProducts);

router.route("/products/:id").get(getProductDetails);
router.route("/filter").post(filterProducts);

module.exports = router;
