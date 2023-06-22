const mongoose = require("mongoose");
const DataModel = require("../../model/Brands/BrandModel");
const ProductModel = require("../../model/Products/ProductModel");
const CreateService = require("../../services/common/CreateService");
const UpdateService = require("../../services/common/UpdateService");
const ListService = require("../../services/common/ListService");
const DropdownService = require("../../services/common/DropdownService");
const CheckAssociateService = require("../../services/common/CheckAssociateService");
const DeleteService = require("../../services/common/DeleteService");
const DetailsByIDService = require("../../services/common/DetailsByIDService");

exports.CreateBrand = async (req, res) => {
  let Result = await CreateService(req, DataModel);
  res.status(200).json(Result);
};

exports.UpdateBrand = async (req, res) => {
  let Result = await UpdateService(req, DataModel);
  res.status(200).json(Result);
};

exports.BrandList = async (req, res) => {
  let SearchRgx = { $regex: req.params.searchKeyword, $options: "i" };
  let SearchArray = [{ Name: SearchRgx }];
  let Result = await ListService(req, DataModel, SearchArray);
  res.status(200).json(Result);
};

exports.BrandDropDown = async (req, res) => {
  let Result = await DropdownService(req, DataModel, { _id: 1, Name: 1 });
  res.status(200).json(Result);
};
exports.BrandDetailsByID = async (req, res) => {
  let Result = await DetailsByIDService(req, DataModel);
  res.status(200).json(Result);
};
exports.BrandDelete = async (req, res) => {
  let DeleteID = req.params.id;
  const ObjectID = mongoose.Types.ObjectId;
  let CheckAssociate = await CheckAssociateService(
    {
      BrandID: ObjectID(DeleteID),
    },
    ProductModel
  );
  if (CheckAssociate) {
    res
      .status(200)
      .json({ status: "associate", data: "Associate With Product" });
  } else {
    let Result = await DeleteService(req, DataModel);
    res.status(200).json(Result);
  }
};
