const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  product: String,
  quantity: Number,
  price: Number,
});

const OrderModel = mongoose.model("order", orderSchema);

const userManySchema = new mongoose.Schema({
  username: String,
  email: String,
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "order",
    },
  ],
});

const UserManyModel = mongoose.model("usermany", userManySchema);


module.exports = {
    OrderModel,
    UserManyModel
}