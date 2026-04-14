const mongoose=require("mongoose")

const productSchema = mongoose.Schema({
  name: String,
  image: Buffer,
  imageType: String, // ✅ THIS IS THE FIX
  price: Number,
  discount: {
    type: Number,
    default: 0,
  },
  bgColor: String,
  panelColor: String,
  textColor: String,
});

// now export the 
module.exports=mongoose.model("product",productSchema)