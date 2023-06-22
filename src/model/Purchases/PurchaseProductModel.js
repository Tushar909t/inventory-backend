const mongoose = require("mongoose");
const DataSchema = mongoose.Schema(
  {
    UserEmail: { type: String },
    PurchaseID: { type: mongoose.Schema.Types.ObjectId },
    ProductID: { type: mongoose.Schema.Types.ObjectId },
    Qty: { type: Number },
    UnitCost: { type: Number },
    Total: { type: Number },
    createDate: { type: Date, default: Date.now() },
  },
  { versionKey: false }
);

const PurchaseProductModel = mongoose.model("purchaseproduct", DataSchema);
module.exports = PurchaseProductModel;
