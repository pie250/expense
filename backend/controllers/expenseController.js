import Expense from "../models/Expense.js";

// ➕ Add Expense
export const addExpense = async (req, res) => {
  try {
    const { title, amount, category } = req.body;

    if (!title || !amount) {
      return res.status(400).json({ message: "Title and amount required" });
    }

    const expense = await Expense.create({
      title,
      amount,
      category,
      user: req.user.id, // ✅ FIXED
    });

    res.status(201).json(expense);
  } catch (err) {
    res.status(500).json({ message: "Error adding expense" });
  }
};

// 📋 Get Expenses
export const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({
      user: req.user.id, // ✅ FIXED
    });

    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: "Error fetching expenses" });
  }
};

// ❌ Delete Expense
export const deleteExpense = async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting expense" });
  }
};