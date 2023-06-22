const mongoose = require("mongoose");
const DataSchema = mongoose.Schema(
  {
    UserEmail: { type: String },
    CustomarName: { type: String },
    Phone: { type: String, unique: true },
    Email: { type: String },
    Address: { type: String },
    createDate: { type: Date, default: Date.now() },
  },
  { versionKey: false }
);
DataSchema.path("Phone").validate(async (Phone) => {
  const PhoneCount = await mongoose.models.customers.countDocuments({ Phone });
  return !PhoneCount;
}, "Phone Already Exists");
const CustomersModel = mongoose.model("customers", DataSchema);
module.exports = CustomersModel;
