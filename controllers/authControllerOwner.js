const ownerModel = require("../models/ownerModel");
const bcrypt=require("bcrypt")

module.exports.CreateOwner = async (req, res) => {
  // no more than 1 owner
  const alreadyOwner = await ownerModel.find({});
  if (alreadyOwner.length > 0) {
    res.send(500).send("you dont have permission");
  } else {
     bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash("admin123", salt, async (err, hash) => {

                if (!err){
                    const owner = await ownerModel.create({
                      fullName: "Abdul ahad",
                      email: "admin@gmail.com",
                      password: hash,
                      picture:
                        "https://images.squarespace-cdn.com/content/v1/57e49a19414fb5b5169a9161/1527278590305-IQUVXUPMHN39NPVXJHM0/%28TR%29HeroMFBlack_MG_1168MDF%281244%29FINAL_WEB.jpg",
                      gstin: "123456789",
                    });
                    
                    console.log("admin has been created");
                    res.status(203).send(owner);
                }
            })
        })


  }
  // now create the user
};

