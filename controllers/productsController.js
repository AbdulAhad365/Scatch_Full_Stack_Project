const productModel = require("../models/productModel");
const userModel = require("../models/userModel");

module.exports.createProduct = async (req, res) => {
  try {
    let { name, image, price, discount, bgColor, panelColor, textColor } =
      req.body;
    // now create the product
    if (discount===""){
      discount=0
    }
    const product = await productModel.create({
      image: req.file.buffer,
      imageType: req.file.mimetype, // ✅ THIS IS THE FIX
      name,
      price,
      discount,
      bgColor,
      panelColor,
      textColor,
    });
    console.log(req.file);
    req.flash("success", "product successfully created");
    res.redirect("/owners/productsCreate");
  } catch (err) {
    req.flash("error", err.message);
    res.redirect("/owners/productsCreate");
  }
};

module.exports.discountProducts = async (req, res) => {
  // get the products first
  const products = await productModel.find({ discount: { $gt: 0 } });
  console.log(productModel);
  res.render("shop", { products });
  //   res.redirect("/shop");
};

module.exports.addtoCard = async (req, res) => {
  // find the user
  if (req.user.role !== "admin") {
    const user = await userModel.findOne({ email: req.user.email });
    let found = false;
    // now add the product in the card
    if (user.card.length === 0) {
      // card of user= null
      user.card.push({ product: req.params.productID, quantity: 1 });
    } else {
      user.card.forEach((item) => {
        if (item.product.toString() === req.params.productID) {
          item.quantity += 1;
          found = true;
        }
      });
      if (!found) {
        user.card.push({ product: req.params.productID, quantity: 1 });
      }
    }
    await user.save();
    req.flash("success", "product added in the card");
    res.redirect("/shop");

    // console.log(req.user)
    // res.send(user)
  } else {
    res.redirect("/shop");
  }
};
