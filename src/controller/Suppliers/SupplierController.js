const mongoose = require("mongoose");
const DataModel = require("../../model/Suppliers/SuppliersModel");
const PurchasesModel = require("../../model/Purchases/PurchasesModel");
const CreateService = require("../../services/common/CreateService");
const UpdateService = require("../../services/common/UpdateService");
const ListService = require("../../services/common/ListService");
const DropDownService = require("../../services/common/DropdownService");
const CheckAssociateService = require("../../services/common/CheckAssociateService");
const DetailsByIDService = require("../../services/common/DetailsByIDService");
const DeleteService = require("../../services/common/DeleteService");

exports.SupplierCreate = async (req, res) => {
  let Result = await CreateService(req, DataModel);
  res.status(200).json(Result);
};
exports.SupplierUpdate = async (req, res) => {
  let Result = await UpdateService(req, DataModel);
  res.status(200).json(Result);
};
exports.SupplierList = async (req, res) => {
  let SearchRgx = { $regex: req.params.searchKeyword, $options: "i" };
  let SearchArray = [
    { Name: SearchRgx },
    { Phone: SearchRgx },
    { Email: SearchRgx },
    { Address: SearchRgx },
  ];
  let Result = await ListService(req, DataModel, SearchArray);
  res.status(200).json(Result);
};
exports.SupplierDropDown = async (req, res) => {
  let Result = await DropDownService(req, DataModel, { _id: 1, Name: 1 });
  res.status(200).json(Result);
};
exports.SupplierDetailsByID = async (req, res) => {
  let Result = await DetailsByIDService(req, DataModel);
  res.status(200).json(Result);
};

exports.DeleteSupplier = async (req, res) => {
  let DeleteID = req.params.id;
  const ObjectID = mongoose.Types.ObjectId;
  let CheckAssociate = await CheckAssociateService(
    { SupplierID: ObjectID(DeleteID) },
    PurchasesModel
  );
  if (CheckAssociate) {
    res
      .status(200)
      .json({ status: "associate", data: "Associate With Purchases" });
  } else {
    let Result = await DeleteService(req, DataModel);
    res.status(200).json(Result);
  }
};
