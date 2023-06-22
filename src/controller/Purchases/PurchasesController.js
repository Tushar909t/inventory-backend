const ParentModel = require("../../model/Purchases/PurchasesModel");
const ChildsModel = require("../../model/Purchases/PurchaseProductModel");
const CreateParentChildService = require("../../services/common/CreateParentChildService");
const ListOneJoinService = require("../../services/common/ListOneJoinService");
const DeleteParentChildService = require("../../services/common/DeleteParentChildService");

exports.CreatePurchases = async (req, res) => {
  let Result = await CreateParentChildService(
    req,
    ParentModel,
    ChildsModel,
    "PurchaseID"
  );
  res.status(200).json(Result);
};
exports.PurchasesList = async (req, res) => {
  let SearchRgx = { $regex: req.params.searchKeyword, $options: "i" };
  let JoinStage = {
    $lookup: {
      from: "suppliers",
      localField: "SupplierID",
      foreignField: "_id",
      as: "suppliers",
    },
  };
  let SearchArray = [
    { Note: SearchRgx },
    { "suppliers.Name": SearchRgx },
    { "suppliers.Address": SearchRgx },
    { "suppliers.Phone": SearchRgx },
    { "suppliers.Email": SearchRgx },
  ];
  let Result = await ListOneJoinService(
    req,
    ParentModel,
    SearchArray,
    JoinStage
  );
  res.status(200).json(Result);
};

exports.PuchasesDelete = async (req, res) => {
  let Result = await DeleteParentChildService(
    req,
    ParentModel,
    ChildsModel,
    "PurchaseID"
  );
  res.status(200).json(Result);
};
