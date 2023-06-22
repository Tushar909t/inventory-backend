const ListService = async (req, DataModel, SearchArray) => {
  try {
    let pageNo = Number(req.params.pageNo);
    let perPage = Number(req.params.perPage);
    let searchValue = req.params.searchKeyword;
    let skipRow = (pageNo - 1) * perPage;
    let UserEmail = req.headers["email"];
    let data;
    if (searchValue !== "0") {
      let SearchQuery = { $or: SearchArray };
      data = await DataModel.aggregate([
        { $match: { UserEmail: UserEmail } },
        { $match: SearchQuery },
        {
          $facet: {
            Total: [{ $match: SearchQuery }, { $count: "count" }],
            Rows: [
              { $match: SearchQuery },
              { $skip: skipRow },
              { $limit: perPage },
            ],
          },
        },
      ]);
    } else {
      data = await DataModel.aggregate([
        {
          $facet: {
            Total: [{ $count: "count" }],
            Rows: [{ $skip: skipRow }, { $limit: perPage }],
          },
        },
      ]);
    }

    return { status: "success", data: data };
  } catch (error) {
    return { status: "fail", data: error.toString() };
  }
};

module.exports = ListService;
