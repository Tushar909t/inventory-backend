const mongoose = require("mongoose");
const DataSchema = mongoose.Schema(
  {
    email: { type: String, unique: true },
    firstname: { type: String },
    lastname: { type: String },
    mobile: { type: String },
    password: { type: String },
    photo: { type: String },
    createDate: { type: Date, default: Date.now() },
  },
  { versionKey: false }
);
DataSchema.path("email").validate(async (email) => {
  const emailCount = await mongoose.models.users.countDocuments({ email });
  return !emailCount;
}, "Email Already Exists");
const UserModel = mongoose.model("users", DataSchema);
module.exports = UserModel;
