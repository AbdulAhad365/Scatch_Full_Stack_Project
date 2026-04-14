const ownerModel = require("../models/ownerModel");
const bcrypt = require("bcrypt");
const generateMyToken = require("../utils/generateToken");

async function loginOwner(log_email, log_password) {
  // find a user with the email if found check password
  const owner = await ownerModel.findOne({ email: log_email });
  console.log(owner);
  if (!owner) {
    console.log("owner does not exist");
    return { success: false, message: "owner not found" };
  } else {
    // req.flash("success", "user found");
    // res.render("login", { message: "user already exists", user });
    const result = await bcrypt.compare(log_password, owner.password);

    // bcrypt.compare(log_password, owner.password, function (err, result) {
    if (result) {
      console.log("owner found");
      let token = generateMyToken(owner, "admin");
      return { success: true, message: "owner found", token: token };
    } else {
      // debug("password not correct")
      console.log("invalid password");
      return { success: false, message: "owner wrong password" };
    }
    // });
  }
}

module.exports = loginOwner;
