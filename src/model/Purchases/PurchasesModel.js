const mongoose = require("mongoose");
const DataSchema = mongoose.Schema(
  {
    UserEmail: { type: String },
    SupplierID: { type: mongoose.Schema.Types.ObjectId },
    VatTax: { type: Number },
    Discount: { type: Number },
    OhterCost: { type: Number },
    ShippingCost: { type: Number },
    GrandTotal: { type: Number },
    Note: { type: String },
    createDate: { type: Date, default: Date.now() },
  },
  { versionKey: false }
);
const PurchasesModel = mongoose.model("purchases", DataSchema);
module.exports = PurchasesModel;
