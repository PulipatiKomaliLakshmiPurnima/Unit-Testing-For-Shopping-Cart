const User = require("../models/userModel");

exports.addProductInCart = async (req, res) => {
  try {
    await User.findOneAndUpdate(
      { _id: req.params.id },
      {
        $addToSet: {
          cart: req.body,
        },
      }
    );

    const product = await User.findById(req.params.id);
    res.send(product);
  } catch (err) {
    console.log(err);
    res.status(500).send(`Error ${err}`);
  }
};

exports.quantityChange = async (req, res) => {
  const cartId = req.body._id;
  const quantity = req.body.quantity;
  const totalPrice = req.body.totalPrice;
  await User.findOneAndUpdate(
    { _id: req.params.id, "cart._id": cartId },
    {
      $set: {
        "cart.$.quantity": quantity,
        "cart.$.totalPrice": totalPrice,
      },
    }
  );
  const product = await User.findById(req.params.id);
  res.send(product);
};

exports.deleteProductInCart = async (req, res) => {
  try {
    await User.findOneAndUpdate(
      { _id: req.params.id },
      {
        $pull: {
          cart: req.body,
        },
      }
    );
    const product = await User.findById(req.params.id);
    res.send(product);
  } catch (err) {
    console.log(err);
    res.status(500).send(`Error ${err}`);
  }
};
