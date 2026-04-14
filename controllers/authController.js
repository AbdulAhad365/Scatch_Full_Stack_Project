const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const generateMyToken = require("../utils/generateToken");
const loginOwner = require("../controllers/ownerLoginFunction");

module.exports.registerUser = async (req, res) => {
  // now register the user
  let { full_name, email, password } = req.body;
  // encrypted password

  //   check if user already exists
  let already_user = await userModel.findOne({ email: email });
  if (!already_user && email !== "admin@gmail.com") {
    try {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
          if (err) {
            req.flash("error", err);
            return res.redirect("/");
          } else {
            const user = await userModel.create({
              fullName: full_name,
              email: email,
              password: hash,
            });
            // now make a cookie
            let token = generateMyToken(user, "user");
            res.cookie("token", token);
            console.log(user);
            res.redirect("/");
          }
        });
      });
    } catch (err) {
      req.flash("error", err.message);
      res.redirect("/");
    }
  } else {
    console.log("user already exists");
    req.flash("error", "user already exists");
    res.redirect("/");
  }
};

module.exports.loginUser = async (req, res) => {
  // first get the email and password
  const { log_email, log_password } = req.body;

  console.log(log_email, log_password);
  // find a user with the email if found check password
  const user = await userModel.findOne({ email: log_email });
  console.log(user);
  if (!user) {
    console.log("user does not exist");
    // check if the person is admin
    const storeAnswer = await loginOwner(log_email, log_password);
    console.log(storeAnswer);
    if (storeAnswer.success) {
      console.log("found it");

      // let token = generateMyToken(storeAnswer.owner, "admin");
      res.cookie("token", storeAnswer.token);
      // res.send(storeAnswer.message);
      req.flash("success", storeAnswer.message);
      res.redirect("/owners/productsCreate");
    } else {
      // user does not exist
      req.flash("error", storeAnswer.message);
      res.redirect("/");
    }
  } else {
    // req.flash("success", "user found");
    // res.render("login", { message: "user already exists", user });
    bcrypt.compare(log_password, user.password, function (err, result) {
      if (result === true) {
        let token = generateMyToken(user);
        res.cookie("token", token);
        req.flash("success", "login successful");
        res.redirect("/shop");
      } else {
        // debug("password not correct")
        console.log("invalid password");
        req.flash("error", "Invalid password");

        res.redirect("/");
      }
    });
  }
};

module.exports.logout = (req, res) => {
  res.cookie("token", "");
  res.redirect("/");
};
