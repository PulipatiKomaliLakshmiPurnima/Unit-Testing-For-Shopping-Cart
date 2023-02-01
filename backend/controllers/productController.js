const Product = require("../models/productModel");
const ApiFeatures = require("../utils/apifeatures");

exports.getAllProducts = async (req, res, next) => {
  const productsCount = await Product.countDocuments();
  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter();
  let products = await apiFeature.query;
  products = await apiFeature.query.clone();
  res.status(200).json({
    success: true,
    products,
    productsCount,
  });
};

exports.getProductDetails = async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(400).json({ message: "Product not found" });
  }
  res.status(200).json({
    success: true,
    product,
  });
};

exports.filterProducts = (req, res) => {
  const category = req.body.categoryFilter;
  const subcat = req.body.subcategoryFilter;
  const condition = category ? { category: category } : { subcategory: subcat };

  Product.find(condition)
    .then((data) => {
      res.send({
        Success: true,
        message: "Retrieved all the products",
        products: data,
      });
    })
    .catch((err) => {
      res.status(404).send({
        message:
          err.message || "Some error occurred while retrieving Products.",
      });
    });
};
