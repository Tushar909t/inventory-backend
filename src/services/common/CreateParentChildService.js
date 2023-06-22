const mongoose = require("mongoose");
const CreateParentChildService = async (
  Request,
  ParentModel,
  ChildsModel,
  JoinPropertyName
) => {
  // Create Transaction Session
  const session = await mongoose.startSession();
  // create Parent
  try {
    session.startTransaction();

    let Parent = Request.body["Parent"];
    Parent.UserEmail = Request.headers["email"];
    let ParentCreate = await ParentModel.create([Parent], { session });
    // Cretae Child
    let Childs = Request.body["Childs"];
    await Childs.forEach((element) => {
      element[JoinPropertyName] = ParentCreate[0]["_id"];
      element["UserEmail"] = Request.headers["email"];
    });

    let CreateChilds = await ChildsModel.insertMany(Childs, { session });
    // Transaction Success
    await session.commitTransaction();
    session.endSession();

    return { status: "success", Parent: ParentCreate, Childs: CreateChilds };
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    return { status: "fail", data: err.toString() };
  }
};
module.exports = CreateParentChildService;

// const CreateParentChildService = async (
//   Request,
//   ParentModel,
//   ChildsModel,
//   JoinPropertyName
// ) => {
//   try {
//     // First Database
//     let Parent = Request.body["Parent"];
//     Parent.UserEmail = Request.headers["email"];
//     let ParentCreate = await ParentModel.create(Parent);

//     if (ParentCreate["_id"]) {
//       try {
//         let Childs = Request.body["Childs"];
//         await Childs.forEach((element) => {
//           element[JoinPropertyName] = ParentCreate["_id"];
//           element["UserEmail"] = Request.headers["email"];
//         });
//         let ChildsCreate = await ChildsModel.insertMany(Childs);

//         return {
//           status: "success",
//           Parent: ParentCreate,
//           Childs: ChildsCreate,
//         };
//       } catch (error) {
//         await ParentModel.remove({ _id: ParentCreate["_id"] });
//         return { status: "fail", data: "Parent Create Fail" };
//       }
//     }
//     // Secend Database
//   } catch (error) {
//     return { status: "fail", data: error };
//   }
// };
// module.exports = CreateParentChildService;
