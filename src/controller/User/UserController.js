const DataModel = require("../../model/User/UserModel");
const OTPModel = require("../../model/User/OTPModel");
const UserCreateService = require("../../services/user/UserCreateService");
const UserLoginService = require("../../services/user/UserLoginService");
const UserDetalisService = require("../../services/user/UserDetalisService");
const UserUpdateService = require("../../services/user/UserUpdateService");
const UserEmailVerifyService = require("../../services/user/UserEmailVerifyService");
const UserOTPVerifyService = require("../../services/user/UserOTPVerifyService");
const UserResetPasswordService = require("../../services/user/UserResetPasswordService");

exports.Regstrations = async (req, res) => {
  let Result = await UserCreateService(req, DataModel);
  res.status(200).json(Result);
};
exports.Login = async (req, res) => {
  let Result = await UserLoginService(req, DataModel);
  res.status(200).json(Result);
};

exports.ProfileDetalis = async (req, res) => {
  let Result = await UserDetalisService(req, DataModel);
  res.status(200).json(Result);
};
exports.ProfileUpdate = async (req, res) => {
  let Result = await UserUpdateService(req, DataModel);
  res.status(200).json(Result);
};
exports.RecoverVerifyEmail = async (req, res) => {
  let Result = await UserEmailVerifyService(req, DataModel);
  res.status(200).json(Result);
};
exports.RecoverVerifyOTP = async (req, res) => {
  let Result = await UserOTPVerifyService(req, OTPModel);
  res.status(200).json(Result);
};
exports.ResetPassword = async (req, res) => {
  let Result = await UserResetPasswordService(req, DataModel);
  res.status(200).json(Result);
};
