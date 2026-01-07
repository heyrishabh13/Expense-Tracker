const express = require("express");
const expenseController = require("../controller/expenseController");
const userAuthentication = require("../middleware/auth");

const router = express.Router();

router.post(
  "/addExpense",
  userAuthentication.authenticate,
  expenseController.addExpense
);
router.delete(
  "/deleteExpense/:id",
  userAuthentication.authenticate,
  expenseController.deleteExpense
);
router.get(
  "/getAllExpenses",
  userAuthentication.authenticate,
  expenseController.getAllExpenses
);

module.exports = router;
