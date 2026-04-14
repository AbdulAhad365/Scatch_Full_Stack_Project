const jwt=require("jsonwebtoken")
let generateMyToken=(user,role)=>{
    return jwt.sign({ email: user.email, id: user._id,role:role || "user" }, process.env.JWT_KEY);
}
module.exports=generateMyToken