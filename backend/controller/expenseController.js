const Expense = require("../models/expense");
const jwt = require("jsonwebtoken");

function isValidString(str) {
  if (str != undefined || str != undefined || str.length !== 0) {
    return true;
  } else {
    return false;
  }
}

const addExpense = async (req, res) => {
  try {
    const token = req.headers.authorization;
    const { money, description, category } = req.body;
    if (
      !isValidString(money) ||
      !isValidString(description) ||
      !isValidString(category)
    ) {
      res
        .status(404)
        .json({ success: false, message: "Required elements are missing" });
    }

    const user = jwt.verify(
      token,
      "ajfdfadfdfjifwjefjfjwifjwijafiawfjifwaewjifiefjw"
    );

    console.log("user>>>>", user);

    const expense = await Expense.create({
      money,
      description,
      category,
      userId: user.userId,
    });

    if (!expense) {
      res.status(404).json({ success: false, message: "Expense not found" });
    }

    res.status(201).json({ success: true, expense });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const deleteExpense = async (req, res) => {
  const token = req.headers.authorization;
  console.log("token >>>>>", token);
  const user = jwt.verify(
    token,
    "ajfdfadfdfjifwjefjfjwifjwijafiawfjifwaewjifiefjw"
  );
  if (!user) {
    res.status(404).json({ message: "Invalid token" });
  }
  try {
    {
      const deletedCount = await Expense.destroy({
        where: { id: req.params.id, userId: user.userId },
      });

      if (deletedCount === 0) {
        return res.status(404).json({ message: "Expense not found" });
      }

      res.json({ message: "Expense deleted successfully" });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error deleting user", error: error.message });
  }
};

const getAllExpenses = async (req, res) => {
  const user = req.user;
  try {
    const expenses = await Expense.findAll({ where: { userId: user.id } });
    if (!expenses) {
      res.status(404).json({ success: false, message: "Expenses not found" });
    }
    console.log("expenses >>> ", expenses);
    res
      .status(200)
      .json({ success: true, count: expenses.length, data: expenses });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

module.exports = {
  addExpense,
  deleteExpense,
  getAllExpenses,
};
