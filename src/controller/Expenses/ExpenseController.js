const DataModel = require("../../model/Expenses/ExpenseModel");
const CreateService = require("../../services/common/CreateService");
const UpdateService = require("../../services/common/UpdateService");
const ListOneJoinService = require("../../services/common/ListOneJoinService");
const DetailsByIDService = require("../../services/common/DetailsByIDService");
const DeleteService = require("../../services/common/DeleteService");

exports.CreateExpense = async (req, res) => {
  let Result = await CreateService(req, DataModel);
  res.status(200).json(Result);
};
exports.UpdateExpense = async (req, res) => {
  let Result = await UpdateService(req, DataModel);
  res.status(200).json(Result);
};
exports.ListExpense = async (req, res) => {
  let SearchRgx = { $regex: req.params.searchKeyword, $options: "i" };
  let SearchArray = [
    { Note: SearchRgx },
    { Amount: SearchRgx },
    { "Type.Name": SearchRgx },
  ];
  let JoinStage = {
    $lookup: {
      from: "expensetypes",
      localField: "TypeID",
      foreignField: "_id",
      as: "Type",
    },
  };
  let Result = await ListOneJoinService(req, DataModel, SearchArray, JoinStage);
  res.status(200).json(Result);
};
exports.ExpenseDetailsByID = async (req, res) => {
  let Result = await DetailsByIDService(req, DataModel);
  res.status(200).json(Result);
};
exports.DeleteExpense = async (req, res) => {
  let Result = await DeleteService(req, DataModel);
  res.status(200).json(Result);
};
