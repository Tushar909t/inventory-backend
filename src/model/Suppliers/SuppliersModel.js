const mongoose = require("mongoose");
const DataSchema = mongoose.Schema(
  {
    UserEmail: { type: String },
    Name: { type: String },
    Address: { type: String },
    Phone: { type: String, unique: true },
    Email: { type: String },
    createDate: { type: Date, default: Date.now() },
  },
  { versionKey: false }
);
DataSchema.path("Phone").validate(async (Phone) => {
  const PhoneCount = await mongoose.models.customers.countDocuments({ Phone });
  return !PhoneCount;
}, "Phone Already Exists");
const SuppliersModel = mongoose.model("suppliers", DataSchema);
module.exports = SuppliersModel;
