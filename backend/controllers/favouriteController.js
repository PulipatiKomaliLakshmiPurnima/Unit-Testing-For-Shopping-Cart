const User = require("../models/userModel");

exports.addProductInFavourite = async (req, res) => {
  try {
    await User.findOneAndUpdate(
      { _id: req.params.id },
      {
        $addToSet: {
          favourite: req.body,
        },
      }
    );
    const product = await User.findById(req.params.id);
    res.send(product);
  } catch (err) {
    res.send(500, `Error ${err}`);
  }
};
exports.deleteProductInFavourite = async (req, res) => {
  console.log("deleterequest", req.body);
  try {
    await User.findOneAndUpdate(
      { _id: req.params.id },
      {
        $pull: {
          favourite: req.body,
        },
      }
    );
    const product = await User.findById(req.params.id);

    res.send(product);
  } catch (e) {
    console.log(err);
    res.send(500, `Error ${err}`);
  }
};
