const mongoose = require("mongoose");
const DeleteParentChildService = async (
  Request,
  ParentModel,
  ChildsModel,
  JoinPropertyName
) => {
  const session = await mongoose.startSession();
  try {
    await session.startTransaction();
    let DeleteID = Request.params.id;
    let UserEmail = Request.headers["email"];

    // Child Detete Query
    let ChildQueryObj = {};
    ChildQueryObj[JoinPropertyName] = DeleteID;
    ChildQueryObj[UserEmail] = UserEmail;

    // Parent Delete Query
    let ParentQueryObj = {};
    ParentQueryObj["_id"] = DeleteID;
    ParentQueryObj[UserEmail] = UserEmail;

    // First Delete
    let ChildDelete = await ChildsModel.deleteOne(ChildQueryObj).session(
      session
    );
    // Second Delete
    let ParentDelete = await ParentModel.deleteMany(ParentQueryObj).session(
      session
    );
    // Comit Transactions
    await session.abortTransaction();
    session.endSession();
    return { status: "success", Parent: ParentDelete, Child: ChildDelete };
  } catch (error) {
    // Roll Back Transations
    await session.abortTransaction();
    session.endSession();
    return { status: "fail", data: error.toString() };
  }
};
module.exports = DeleteParentChildService;

// const DeleteParentChildService = async (
//   Request,
//   ParentModel,
//   ChildsModel,
//   JoinPropertyName
// ) => {
//   const session = await mongoose.startSession();
//   session.startTransaction();

//   try {
//     let DeleteID = Request.params.id;
//     let UserEmail = Request.headers["email"];
//     // Child Detete Query
//     let ChildQueryObj = {};
//     ChildQueryObj[JoinPropertyName] = DeleteID;
//     ChildQueryObj[UserEmail] = UserEmail;

//     // Parent Delete Query
//     let ParentQueryObj = {};
//     ParentQueryObj["_id"] = DeleteID;
//     ParentQueryObj[UserEmail] = UserEmail;
//     // Perform some database operations using the session object
//     await ChildsModel.deleteOne(ChildQueryObj).session(session);
//     await ParentModel.deleteMany(ParentQueryObj).session(session);

//     // If all operations are successful, commit the transaction
//     await session.commitTransaction();
//     return { status: "success", Parent: ParentDelete, Child: ChildDelete };
//   } catch (error) {
//     // If any operation fails, abort the transaction

//     await session.abortTransaction();
//     return { status: "fail", data: error.toString() };
//     throw error;
//   } finally {
//     // Finally, end the session
//     session.endSession();
//   }
// };

// module.exports = DeleteParentChildService;
