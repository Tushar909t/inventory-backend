const ParentModel = require("../../model/Sales/SaleModel");
const ChildsModel = require("../../model/Sales/SaleProductModel");
const CreateParentChildService = require("../../services/common/CreateParentChildService");
const ListOneJoinService = require("../../services/common/ListOneJoinService");
const DeleteParentChildService = require("../../services/common/DeleteParentChildService");

exports.CreateSales = async (req, res) => {
  let Result = await CreateParentChildService(
    req,
    ParentModel,
    ChildsModel,
    "SaleID"
  );
  res.status(200).json(Result);
};
exports.SaleList = async (req, res) => {
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
    { "customers.Name": SearchRgx },
    { "customers.Address": SearchRgx },
    { "customers.Phone": SearchRgx },
    { "customers.Email": SearchRgx },
  ];
  let Result = await ListOneJoinService(
    req,
    ParentModel,
    SearchArray,
    JoinStage
  );
  res.status(200).json(Result);
};
exports.DeleteSale = async (req, res) => {
  let Result = await DeleteParentChildService(req, ParentModel, "SaleID");
  res.status(200).json(Result);
};
