const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middleware/isLoggedIn");

const { CreateOwner } = require("../controllers/authControllerOwner");
router.get("/", (req, res) => {
  res.send("this i am a owner");
});

// create a owner only in development
if (process.env.node_env === "development") {
  router.post("/create", CreateOwner);
}

router.get("/productsCreate", isLoggedIn, (req, res) => {
  if (req.user.role === "admin") {
    res.render("createproducts");
  }
  else{
    console.log("you are not admin")
    res.redirect("/shop")
  }
});
// login as the owner

module.exports = router;
