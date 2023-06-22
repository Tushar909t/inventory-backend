const ExpensesReportService = require("../../services/report/ExpensesReportService");
const PurchasesReportService = require("../../services/report/PurchasesReportService");
const ReturnReportService = require("../../services/report/ReturnReportService");
const SaleReportService = require("../../services/report/SaleReportService");

exports.ExpensesByDate = async (req, res) => {
  let Result = await ExpensesReportService(req);
  res.status(200).json(Result);
};
exports.PurchasesByDate = async (req, res) => {
  let Result = await PurchasesReportService(req);
  res.status(200).json(Result);
};
exports.ReturnByDate = async (req, res) => {
  let Result = await ReturnReportService(req);
  res.status(200).json(Result);
};
exports.SaleByDate = async (req, res) => {
  let Result = await SaleReportService(req);
  res.status(200).json(Result);
};
