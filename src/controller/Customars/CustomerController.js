const mongoose = require("mongoose");
const DataModel = require("../../model/Customers/CustomersModel");
const SaleModel = require("../../model/Sales/SaleModel");
const CreateService = require("../../services/common/CreateService");
const UpdateService = require("../../services/common/UpdateService");
const ListService = require("../../services/common/ListService");
const DropDownService = require("../../services/common/DropdownService");
const CheckAssociateService = require("../../services/common/CheckAssociateService");
const DetailsByIDService = require("../../services/common/DetailsByIDService");
const DeleteService = require("../../services/common/DeleteService");

exports.CustomerCreate = async (req, res) => {
  let Result = await CreateService(req, DataModel);
  res.status(200).json(Result);
};

exports.CustomerUpdate = async (req, res) => {
  let Result = await UpdateService(req, DataModel);
  res.status(200).json(Result);
};
exports.CustomerList = async (req, res) => {
  let SearchRgx = { $regex: req.params.searchKeyword, $options: "i" };
  let SearchArray = [
    { CustomarName: SearchRgx },
    { Address: SearchRgx },
    { Phone: SearchRgx },
  ];
  let Result = await ListService(req, DataModel, SearchArray);
  res.status(200).json(Result);
};
exports.CustomerDropDown = async (req, res) => {
  let Result = await DropDownService(req, DataModel, {
    _id: 1,
    CustomarName: 1,
  });
  res.status(200).json(Result);
};
exports.CustomersDetailsByID = async (req, res) => {
  let Result = await DetailsByIDService(req, DataModel);
  res.status(200).json(Result);
};
exports.DeleteCustomers = async (req, res) => {
  let DeleteID = req.params.id;
  const ObjectId = mongoose.Types.ObjectId;
  let CheckAssocite = await CheckAssociateService(
    {
      CustomerID: ObjectId(DeleteID),
    },
    SaleModel
  );
  if (CheckAssocite) {
    res.status(200).json({ status: "associate", data: "Associate With Sale" });
  } else {
    let Result = await DeleteService(req, DataModel);
    res.status(200).json(Result);
  }
};
