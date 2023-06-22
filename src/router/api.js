const express = require("express");
const AuthVerifyMiddleware = require("../middleware/AuthVerifyMiddleware");
const UserController = require("../controller/User/UserController");
const BrandController = require("../controller/Brands/BrandController");
const CategorieController = require("../controller/Categories/CategorieController");
const CustomerController = require("../controller/Customars/CustomerController");
const SupplierController = require("../controller/Suppliers/SupplierController");
const ExpenseTyepeController = require("../controller/Expenses/ExpenseTypeController");
const ExpenseController = require("../controller/Expenses/ExpenseController");
const ProductController = require("../controller/Products/ProductController");
const PurchasesController = require("../controller/Purchases/PurchasesController");
const SaleController = require("../controller/Sales/SaleController");
const ReturnController = require("../controller/Returns/ReturnController");
const ReportController = require("../controller/Report/ReportController");
const SummaryController = require("../controller/Summary/SummaryController");
const router = express.Router();

// User Profile
router.post("/Registrations", UserController.Regstrations);
router.post("/Login", UserController.Login);
router.get(
  "/ProfileDetalis",
  AuthVerifyMiddleware,
  UserController.ProfileDetalis
);
router.post(
  "/ProfileUpdate",
  AuthVerifyMiddleware,
  UserController.ProfileUpdate
);
// User Reset Password
router.get("/RecoverVerifyEmail/:email", UserController.RecoverVerifyEmail);
router.get("/RecoverVerifyOTP/:email/:otp", UserController.RecoverVerifyOTP);
router.post("/ResetPassword", UserController.ResetPassword);

// Brands

router.post("/CreateBrand", AuthVerifyMiddleware, BrandController.CreateBrand);
router.post(
  "/UpdateBrand/:id",
  AuthVerifyMiddleware,
  BrandController.UpdateBrand
);
router.get(
  "/BrandList/:pageNo/:perPage/:searchKeyword",
  AuthVerifyMiddleware,
  BrandController.BrandList
);
router.get(
  "/BrandDropDown",
  AuthVerifyMiddleware,
  BrandController.BrandDropDown
);
router.get(
  "/BrandDetailsByID/:id",
  AuthVerifyMiddleware,
  BrandController.BrandDetailsByID
);
router.get(
  "/BrandDelete/:id",
  AuthVerifyMiddleware,
  BrandController.BrandDelete
);
// Categories

router.post(
  "/CreateCategories",
  AuthVerifyMiddleware,
  CategorieController.CreateCategories
);
router.post(
  "/UpdateCategories/:id",
  AuthVerifyMiddleware,
  CategorieController.UpdateCategories
);
router.get(
  "/ListCategories/:pageNo/:perPage/:searchKeyword",
  AuthVerifyMiddleware,
  CategorieController.ListCategories
);
router.get(
  "/DropDownCategories",
  AuthVerifyMiddleware,
  CategorieController.DropDownCategories
);
router.get(
  "/CategorieDetailByID/:id",
  AuthVerifyMiddleware,
  CategorieController.CategorieDetailByID
);
router.get(
  "/DeleteCategories/:id",
  AuthVerifyMiddleware,
  CategorieController.DeleteCategories
);

// Customer

router.post(
  "/CustomerCreate",
  AuthVerifyMiddleware,
  CustomerController.CustomerCreate
);
router.post(
  "/CustomerUpdate/:id",
  AuthVerifyMiddleware,
  CustomerController.CustomerUpdate
);
router.get(
  "/CustomerList/:pageNo/:perPage/:searchKeyword",
  AuthVerifyMiddleware,
  CustomerController.CustomerList
);
router.get(
  "/CustomerDropDown",
  AuthVerifyMiddleware,
  CustomerController.CustomerDropDown
);
router.post(
  "/CustomerUpdate/:id",
  AuthVerifyMiddleware,
  CustomerController.CustomerUpdate
);
router.get(
  "/CustomerList/:pageNo/:perPage/:searchKeyword",
  AuthVerifyMiddleware,
  CustomerController.CustomerList
);
router.get(
  "/CustomerDropDown",
  AuthVerifyMiddleware,
  CustomerController.CustomerDropDown
);
router.get(
  "/CustomersDetailsByID/:id",
  AuthVerifyMiddleware,
  CustomerController.CustomersDetailsByID
);
router.get(
  "/DeleteCustomers/:id",
  AuthVerifyMiddleware,
  CustomerController.DeleteCustomers
);

// Supplier

router.post(
  "/SupplierCreate",
  AuthVerifyMiddleware,
  SupplierController.SupplierCreate
);
router.post(
  "/SupplierUpdate/:id",
  AuthVerifyMiddleware,
  SupplierController.SupplierUpdate
);
router.get(
  "/SupplierList/:pageNo/:perPage/:searchKeyword",
  AuthVerifyMiddleware,
  SupplierController.SupplierList
);
router.get(
  "/SupplierDropDown",
  AuthVerifyMiddleware,
  SupplierController.SupplierDropDown
);
router.get(
  "/SupplierDetailsByID/:id",
  AuthVerifyMiddleware,
  SupplierController.SupplierDetailsByID
);
router.get(
  "/DeleteSupplier/:id",
  AuthVerifyMiddleware,
  SupplierController.DeleteSupplier
);
// Expense Type

router.post(
  "/CreateExpenseType",
  AuthVerifyMiddleware,
  ExpenseTyepeController.CreateExpenseType
);
router.post(
  "/UpdateExpenseType/:id",
  AuthVerifyMiddleware,
  ExpenseTyepeController.UpdateExpenseType
);
router.get(
  "/ListExpenseType/:pageNo/:perPage/:searchKeyword",
  AuthVerifyMiddleware,
  ExpenseTyepeController.ListExpenseType
);
router.get(
  "/DropDownExpenseType",
  AuthVerifyMiddleware,
  ExpenseTyepeController.DropDownExpenseType
);
router.get(
  "/ExpenseTypeDetailsByID/:id",
  AuthVerifyMiddleware,
  ExpenseTyepeController.ExpenseTypeDetailsByID
);
router.get(
  "/DeleteExpenseType/:id",
  AuthVerifyMiddleware,
  ExpenseTyepeController.DeleteExpenseType
);
// Expense
router.post(
  "/CreateExpense",
  AuthVerifyMiddleware,
  ExpenseController.CreateExpense
);
router.post(
  "/UpdateExpense/:id",
  AuthVerifyMiddleware,
  ExpenseController.UpdateExpense
);
router.get(
  "/ListExpense/:pageNo/:perPage/:searchKeyword",
  AuthVerifyMiddleware,
  ExpenseController.ListExpense
);
router.get(
  "/ExpenseDetailsByID/:id",
  AuthVerifyMiddleware,
  ExpenseController.ExpenseDetailsByID
);
router.get(
  "/DeleteExpense/:id",
  AuthVerifyMiddleware,
  ExpenseController.DeleteExpense
);

// Product

router.post(
  "/CreateProducts",
  AuthVerifyMiddleware,
  ProductController.CreateProducts
);
router.post(
  "/UpdateProducts/:id",
  AuthVerifyMiddleware,
  ProductController.UpdateProducts
);
router.get(
  "/ProductList/:pageNo/:perPage/:searchKeyword",
  AuthVerifyMiddleware,
  ProductController.ProductList
);
router.get(
  "/ProductsDropDown",
  AuthVerifyMiddleware,
  ProductController.ProductsDropDown
);
router.get(
  "/ProductDetailsByID/:id",
  AuthVerifyMiddleware,
  ProductController.ProductDetailsByID
);
router.get(
  "/DeleteProduct/:id",
  AuthVerifyMiddleware,
  ProductController.DeleteProduct
);
// Purchases
router.post(
  "/CreatePurchases",
  AuthVerifyMiddleware,
  PurchasesController.CreatePurchases
);
router.get(
  "/PurchasesList/:pageNo/:perPage/:searchKeyword",
  AuthVerifyMiddleware,
  PurchasesController.PurchasesList
);
router.get(
  "/PuchasesDelete/:id",
  AuthVerifyMiddleware,
  PurchasesController.PuchasesDelete
);
// Sale
router.post("/CreateSales", AuthVerifyMiddleware, SaleController.CreateSales);
router.get(
  "/SaleList/:pageNo/:perPage/:searchKeyword",
  AuthVerifyMiddleware,
  SaleController.SaleList
);
router.get("/DeleteSale/:id", AuthVerifyMiddleware, SaleController.DeleteSale);
// Return
router.post(
  "/CreateReturn",
  AuthVerifyMiddleware,
  ReturnController.CreateReturn
);
router.get(
  "/ListReturn/:pageNo/:perPage/:searchKeyword",
  AuthVerifyMiddleware,
  ReturnController.ListReturn
);
router.get(
  "/DeleteReturn/:id",
  AuthVerifyMiddleware,
  ReturnController.DeleteReturn
);
// Report

router.post(
  "/ExpensesByDate",
  AuthVerifyMiddleware,
  ReportController.ExpensesByDate
);
router.post(
  "/PurchasesByDate",
  AuthVerifyMiddleware,
  ReportController.PurchasesByDate
);
router.post(
  "/ReturnByDate",
  AuthVerifyMiddleware,
  ReportController.ReturnByDate
);
router.post("/SaleByDate", AuthVerifyMiddleware, ReportController.SaleByDate);
// Dashboard Summary
router.get(
  "/ExpensesSummary",
  AuthVerifyMiddleware,
  SummaryController.ExpensesSummary
);
router.get(
  "/PurchasesSummary",
  AuthVerifyMiddleware,
  SummaryController.PurchasesSummary
);
router.get("/SaleSummary", AuthVerifyMiddleware, SummaryController.SaleSummary);
router.get(
  "/ReturnSummary",
  AuthVerifyMiddleware,
  SummaryController.ReturnSummary
);
//API Routing End Point

module.exports = router;
