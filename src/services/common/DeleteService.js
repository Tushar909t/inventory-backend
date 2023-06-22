const DeleteService = async (Request, DataModel) => {
  try {
    let DeleteID = Request.params.id;
    let UserEmail = Request.headers["email"];
    let QueryObjet = {};
    QueryObjet["_id"] = DeleteID;
    QueryObjet[UserEmail] = UserEmail;

    let Delete = await DataModel.deleteMany(QueryObjet);
    return { status: "success", Delete: Delete };
  } catch (error) {
    return { status: "fail", data: error.toString() };
  }
};
module.exports = DeleteService;
