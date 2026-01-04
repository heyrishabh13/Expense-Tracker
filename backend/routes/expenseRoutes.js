const express = require("express");
const expenseController = require("../controller/expenseController");
const router = express.Router();

router.post("/addExpense", expenseController.addExpense);
router.delete("/deleteExpense/:id", expenseController.deleteExpense);
router.get("/getAllExpenses", expenseController.getAllExpenses);

module.exports = router;
