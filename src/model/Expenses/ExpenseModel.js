const mongoose = require("mongoose");
const DataSchema = mongoose.Schema(
  {
    UserEmail: { type: String },
    TypeID: { type: mongoose.Schema.Types.ObjectId },
    Amount: { type: Number },
    Note: { type: String },
    createDate: { type: Date, default: Date.now() },
  },
  { versionKey: false }
);
const ExpenseModel = mongoose.model("expense", DataSchema);
module.exports = ExpenseModel;
