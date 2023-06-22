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
  const NameCount = await mongoose.models.categories.countDocuments({ Name });
  return !NameCount;
}, "Name Already Exists");
const CategoriesModel = mongoose.model("categories", DataSchema);
module.exports = CategoriesModel;
