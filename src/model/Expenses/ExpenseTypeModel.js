const mongoose = require("mongoose");
const DataSchema = mongoose.Schema(
  {
    UserEmail: { type: String },
    Name: { type: String, unique: true },
    createDate: { type: Date, default: Date.now() },
  },
  { versionKey: false }
);

const ExpenseTypeModel = mongoose.model("expensetypes", DataSchema);
module.exports = ExpenseTypeModel;
