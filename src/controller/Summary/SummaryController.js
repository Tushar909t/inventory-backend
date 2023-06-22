const ExpensesSummaryService = require("../../services/summary/ExpensesSummaryService");
const PurchasesSummaryService = require("../../services/summary/PurchasesSummaryService");
const SaleSummaryService = require("../../services/summary/SaleSummaryService");
const ReturnSummaryService = require("../../services/summary/ReturnSummaryService");

exports.ExpensesSummary = async (req, res) => {
  let Result = await ExpensesSummaryService(req);
  res.status(200).json(Result);
};
exports.PurchasesSummary = async (req, res) => {
  let Result = await PurchasesSummaryService(req);
  res.status(200).json(Result);
};
exports.SaleSummary = async (req, res) => {
  let Result = await SaleSummaryService(req);
  res.status(200).json(Result);
};
exports.ReturnSummary = async (req, res) => {
  let Result = await ReturnSummaryService(req);
  res.status(200).json(Result);
};
