const express = require("express");
const { isLoggedIn } = require("../middleware/isLoggedIn");
const productModel = require("../models/productModel");
const {
  createProduct,
  discountProducts,
  addtoCard,
} = require("../controllers/productsController");
const upload = require("../config/multer-config");
const userModel = require("../models/userModel");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("this i am a product");
});

router.post("/create", isLoggedIn, upload.single("image"), createProduct);

// discounted products only show
router.get("/discount", isLoggedIn, discountProducts);


// route to card
router.get("/cart",isLoggedIn,async (req,res)=>{
  const user=await userModel.findOne({email:req.user.email}).populate("card.product")
  console.log(user)
  user.card.forEach((item) => {
    console.log("Product ID:", item.product._id);
    console.log("Product Name:", item.product.name);
    console.log("Product Price:", item.product.price);
    console.log("Quantity:", item.quantity);
    console.log("_____________________")
  });
  res.render("cart",{user})
})

// add to card
router.get("/addToCard/:productID", isLoggedIn, addtoCard);


module.exports = router;
