const mongoose = require("mongoose");
const DataModel = require("../../model/Products/ProductModel");
const PurchaseModel = require("../../model/Returns/ReturnProductModel");
const ReturnModel = require("../../model/Returns/ReturnProductModel");
const SaleModel = require("../../model/Sales/SaleProductModel");
const CreateService = require("../../services/common/CreateService");
const UpdateService = require("../../services/common/UpdateService");
const ListTwoJoinService = require("../../services/common/ListTwoJoinService");
const CheckAssociateService = require("../../services/common/CheckAssociateService");
const DetailsByIDService = require("../../services/common/DetailsByIDService");
const DeleteService = require("../../services/common/DeleteService");
const DropDownService = require("../../services/common/DropdownService");

exports.CreateProducts = async (req, res) => {
  let Result = await CreateService(req, DataModel);
  res.status(200).json(Result);
};
exports.UpdateProducts = async (req, res) => {
  let Result = await UpdateService(req, DataModel);
  res.status(200).json(Result);
};
exports.ProductList = async (req, res) => {
  let SearchRgx = { $regex: req.params.searchKeyword, $options: "i" };
  let SearchArray = [
    { Name: SearchRgx },
    { Unit: SearchRgx },
    { Detalis: SearchRgx },
    { "brands.Name": SearchRgx },
    { "categories.Name": SearchRgx },
  ];
  let JoinStage1 = {
    $lookup: {
      from: "categories",
      localField: "CategoriID",
      foreignField: "_id",
      as: "categories",
    },
  };
  let JoinStage2 = {
    $lookup: {
      from: "brands",
      localField: "BrandID",
      foreignField: "_id",
      as: "brands",
    },
  };

  let Result = await ListTwoJoinService(
    req,
    DataModel,
    SearchArray,
    JoinStage1,
    JoinStage2
  );
  res.status(200).json(Result);
};
exports.ProductDetailsByID = async (req, res) => {
  let Result = await DetailsByIDService(req, DataModel);
  res.status(200).json(Result);
};
exports.DeleteProduct = async (req, res) => {
  let DeleteID = req.params.id;
  const ObjectID = mongoose.Types.ObjectId;
  let CheckAssociatePurchase = await CheckAssociateService(
    {
      ProductID: ObjectID(DeleteID),
    },
    PurchaseModel
  );
  let CheckAssociateReturn = await CheckAssociateService(
    {
      ProductID: ObjectID(DeleteID),
    },
    ReturnModel
  );
  let CheckAssociateSale = await CheckAssociateService(
    {
      ProductID: ObjectID(DeleteID),
    },
    SaleModel
  );
  if (CheckAssociatePurchase) {
    res
      .status(200)
      .json({ status: "associate", data: "Associate With Purchases" });
  } else if (CheckAssociateReturn) {
    res
      .status(200)
      .json({ status: "associate", data: "Associate With Return" });
  } else if (CheckAssociateSale) {
    res.status(200).json({ status: "associate", data: "Associate With Sale" });
  } else {
    let Result = await DeleteService(req, DataModel);
    res.status(200).json(Result);
  }
};

exports.ProductsDropDown = async (req, res) => {
  let Result = await DropDownService(req, DataModel, { _id: 1, Name: 1 });
  res.status(200).json(Result);
};
