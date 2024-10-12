
const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  amount: Number,
  date: Date,
  description: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "usersq",
  },
});

const TransactionModel = mongoose.model("Transaction", transactionSchema);


const usersqSchema = new mongoose.Schema({
  username: String,
  email: String,
});

const UserSqModel = mongoose.model("usersq", usersqSchema);

module.exports = {
    TransactionModel,
    UserSqModel
}