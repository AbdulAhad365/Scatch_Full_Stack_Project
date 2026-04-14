const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middleware/isLoggedIn");
const { logout } = require("../controllers/authController");
const productModel = require("../models/productModel");

router.get("/", (req, res) => {
  //   res.render("index");
  // let error=req.flash("error")
  res.render("login");
});
router.get("/shop", isLoggedIn, async (req, res) => {
  // import the products
  const products = await productModel.find({});
  res.render("shop",{products});
});



router.get("/logout", isLoggedIn, logout);
module.exports = router;
