const mongoooe = require("mongoose");


const ownerModel =  mongoooe.Schema({
  fullName: {
    type:String,
    minLength:3,
    trim:true
  },
  email: String,
  password: String,
  products: [
    {
      product: {
        type: mongoooe.Schema.Types.ObjectId,
        ref: "product",
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
  picture: String,
  gstin:String
});

module.exports = mongoooe.model("owner", ownerModel);
