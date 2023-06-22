const mongoose = require("mongoose");
const DataSchema = mongoose.Schema(
  {
    UserEmail: { type: String },
    CategoriID: { type: mongoose.Schema.Types.ObjectId },
    BrandID: { type: mongoose.Schema.Types.ObjectId },
    Name: { type: String },
    Unit: { type: String },
    Detalis: { type: String },
    createDate: { type: Date, default: Date.now() },
  },
  { versionKey: false }
);
const ProductModel = mongoose.model("product", DataSchema);
module.exports = ProductModel;
