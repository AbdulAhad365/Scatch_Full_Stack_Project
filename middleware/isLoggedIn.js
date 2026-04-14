const jwt=require("jsonwebtoken")
const userModel=require("../models/userModel")
const ownerModel=require("../models/ownerModel")



module.exports.isLoggedIn=async (req,res,next)=>{
    if (!req.cookies.token){
        req.flash("error","you need to login first")
        return res.redirect("/")
    }
    else{
        // req.user=user
        try{
            
            // now decoded messge
            const decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);
            req.user=decoded
            next()
        }
        catch(err){
            req.flash("error","some error occurs while displaying")
            res.redirect("/")
        }
    }
}