const mongoose = require("mongoose");
const DataSchema = mongoose.Schema(
  {
    UserEmail: { type: String },
    Name: { type: String, unique: true },
    createDate: { type: Date, default: Date.now() },
  },
  { versionKey: false }
);
DataSchema.path("Name").validate(async (Name) => {
  const NameCount = await mongoose.models.brands.countDocuments({ Name });
  return !NameCount;
}, "Name Already Exists");
const BrandModel = mongoose.model("brands", DataSchema);
module.exports = BrandModel;
