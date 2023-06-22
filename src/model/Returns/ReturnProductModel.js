const mongoose = require("mongoose");
const DataSchema = mongoose.Schema(
  {
    UserEmail: { type: String },
    ReturnID: { type: mongoose.Schema.Types.ObjectId },
    ProductID: { type: mongoose.Schema.Types.ObjectId },
    Qty: { type: Number },
    UnitCost: { type: Number },
    Total: { type: Number },
    createDate: { type: Date, default: Date.now() },
  },
  { versionKey: false }
);
const ReturnProductModel = mongoose.model("returnproduct", DataSchema);
module.exports = ReturnProductModel;
