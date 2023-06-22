const SaleProductModel = require("../../model/Sales/SaleProductModel");
const SaleReportService = async (Request) => {
  try {
    let UserEmail = Request.headers["email"];
    let FormDate = Request.body["FormDate"];
    let ToDate = Request.body["ToDate"];

    let data = await SaleProductModel.aggregate([
      {
        $match: {
          UserEmail: UserEmail,
          createDate: { $gte: new Date(FormDate), $lte: new Date(ToDate) },
        },
      },
      {
        $facet: {
          Total: [
            {
              $group: {
                _id: 0,
                TotalAmount: { $sum: "$Total" },
              },
            },
          ],
          Rows: [
            {
              $lookup: {
                from: "products",
                localField: "products.ProductID",
                foreignField: "_id",
                as: "products",
              },
            },
            { $unwind: "$products" },
            {
              $lookup: {
                from: "brands",
                localField: "products.BrandID",
                foreignField: "_id",
                as: "brands",
              },
            },
            {
              $lookup: {
                from: "categories",
                localField: "products.CategoriID",
                foreignField: "_id",
                as: "categories",
              },
            },
          ],
        },
      },
    ]);
    return { status: "success", data: data };
  } catch (error) {
    return { status: "fail", data: error.toString() };
  }
};
module.exports = SaleReportService;
