const mongoose = require("mongoose");
const DataModel = require("../../model/Categories/CategoriesModel");
const ProductModel = require("../../model/Products/ProductModel");
const CreateService = require("../../services/common/CreateService");
const UpdateService = require("../../services/common/UpdateService");
const ListService = require("../../services/common/ListService");
const DropDownService = require("../../services/common/DropdownService");
const CheckAssociateService = require("../../services/common/CheckAssociateService");
const DetailsByIDService = require("../../services/common/DetailsByIDService");
const DeleteService = require("../../services/common/DeleteService");
exports.CreateCategories = async (req, res) => {
  let Result = await CreateService(req, DataModel);
  res.status(200).json(Result);
};
exports.UpdateCategories = async (req, res) => {
  let Result = await UpdateService(req, DataModel);
  res.status(200).json(Result);
};
exports.ListCategories = async (req, res) => {
  let SearchRgx = { $regex: req.params.searchKeyword, $options: "i" };
  let SearchArray = [{ Name: SearchRgx }];
  let Result = await ListService(req, DataModel, SearchArray);
  res.status(200).json(Result);
};
exports.DropDownCategories = async (req, res) => {
  let Result = await DropDownService(req, DataModel, { _id: 1, Name: 1 });
  res.status(200).json(Result);
};
exports.CategorieDetailByID = async (req, res) => {
  let Result = await DetailsByIDService(req, DataModel);
  res.status(200).json(Result);
};
exports.DeleteCategories = async (req, res) => {
  let DeleteID = req.params.id;
  const ObjectID = mongoose.Types.ObjectId;
  let CheckAssociate = await CheckAssociateService(
    {
      CategoriID: ObjectID(DeleteID),
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
