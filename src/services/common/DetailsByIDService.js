const mongoose = require("mongoose");
const DetailsByIDService = async (Request, DataModel) => {
  try {
    let DetailID = Request.params.id;
    let UserEmail = Request.headers["email"];

    const ObjectID = mongoose.Types.ObjectId;

    let QueryObject = {};
    QueryObject["_id"] = ObjectID(DetailID);
    QueryObject["UserEmail"] = UserEmail;
    let data = await DataModel.aggregate([{ $match: QueryObject }]);
    return { status: "success", data: data };
  } catch (error) {
    return { status: "fail", data: error.toString() };
  }
};
module.exports = DetailsByIDService;
