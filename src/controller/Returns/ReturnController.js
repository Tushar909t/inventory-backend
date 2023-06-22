const ParentModel = require("../../model/Returns/ReturnModel");
const ChildsModel = require("../../model/Returns/ReturnProductModel");
const CreateParentChildService = require("../../services/common/CreateParentChildService");
const ListOneJoinService = require("../../services/common/ListOneJoinService");
const DeleteParentChildService = require("../../services/common/DeleteParentChildService");

exports.CreateReturn = async (req, res) => {
  let Result = await CreateParentChildService(
    req,
    ParentModel,
    ChildsModel,
    "ReturnID"
  );
  res.status(200).json(Result);
};

exports.ListReturn = async (req, res) => {
  let SearchRgx = { $regex: req.params.searchKeyword, $options: "i" };
  let JoinStage = {
    $lookup: {
      from: "customers",
      localField: "CustomerID",
      foreignField: "_id",
      as: "customers",
    },
  };
  let SearchArray = [
    { Note: SearchRgx },
    { "customers.CustomarName": SearchRgx },
    { "customers.Phone": SearchRgx },
    { "customers.Email": SearchRgx },
    { "customers.Address": SearchRgx },
  ];
  let Result = await ListOneJoinService(
    req,
    ParentModel,
    SearchArray,
    JoinStage
  );
  res.status(200).json(Result);
};
exports.DeleteReturn = async (req, res) => {
  let Result = await DeleteParentChildService(req, ParentModel, "ReturnID");
  res.status(200).json(Result);
};
