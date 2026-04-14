const mongoooe = require("mongoose");

const userSchema = mongoooe.Schema({
  fullName: {
    type: String,
    minLength: 3,
    trim: true,
  },
  email: String,
  password: String,
  card: [
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
  orders: [
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
  contact: Number,
  picture: String,
});

module.exports = mongoooe.model("user", userSchema);
