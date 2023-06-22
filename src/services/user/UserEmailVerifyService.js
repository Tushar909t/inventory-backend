const SendEmailUtility = require("../../utility/SendEmailUtility");
const OTPModel = require("../../model/User/OTPModel");
const UserEmailVerifyService = async (Request, DataModel) => {
  try {
    // Email Query
    let email = Request.params.email;
    let OTPCode = Math.floor(100000 + Math.random() * 900000);
    let UserCount = await DataModel.aggregate([
      { $match: { email: email } },
      { $count: "total" },
    ]);
    if (UserCount.length > 0) {
      // Insert Otp
      await OTPModel.create({ email: email, otp: OTPCode });
      // Send Email
      let SendEmail = await SendEmailUtility(
        email,
        "Your PIN CODE is =" + OTPCode,
        "Inventory Verification"
      );
      return { status: "success", data: SendEmail };
    } else {
      return { status: "fail", data: "User Not Found" };
    }
  } catch (error) {
    return { status: "fail", data: error.toString() };
  }
};

module.exports = UserEmailVerifyService;
