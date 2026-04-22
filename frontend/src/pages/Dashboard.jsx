import { useEffect, useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("All");

  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "",
  });

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // 🔹 Fetch Expenses
  const fetchExpenses = async () => {
    const res = await API.get("/expenses", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setExpenses(res.data);
    setFiltered(res.data);
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  // 🔹 Add Expense
  const addExpense = async () => {
    await API.post("/expenses", form, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setForm({ title: "", amount: "", category: "" });
    fetchExpenses();
  };

  // 🔹 Delete Expense
  const deleteExpense = async (id) => {
    await API.delete(`/expenses/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchExpenses();
  };

  // 🔹 Filter Logic
  const handleFilter = (category) => {
    setCategoryFilter(category);

    if (category === "All") {
      setFiltered(expenses);
    } else {
      const filteredData = expenses.filter(
        (exp) => exp.category === category
      );
      setFiltered(filteredData);
    }
  };

  // 🔹 Total Calculation
  const totalAmount = filtered.reduce(
    (sum, exp) => sum + Number(exp.amount),
    0
  );

  // 🔹 Unique Categories
  const categories = ["All", ...new Set(expenses.map(e => e.category))];

  // 🔹 Logout
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Expense Dashboard</h2>

      <button onClick={logout}>Logout</button>

      {/* ➕ Add Expense */}
      <div style={{ marginTop: "20px" }}>
        <input
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <input
          type="number"
          placeholder="Amount"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
        />

        <input
          placeholder="Category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />

        <button onClick={addExpense}>Add</button>
      </div>

      {/* 🔍 Filter */}
      <div style={{ marginTop: "20px" }}>
        <label>Filter by Category: </label>
        <select
          value={categoryFilter}
          onChange={(e) => handleFilter(e.target.value)}
        >
          {categories.map((cat, i) => (
            <option key={i}>{cat}</option>
          ))}
        </select>
      </div>

      {/* 💰 Total */}
      <h3 style={{ marginTop: "20px" }}>
        Total: ₹{totalAmount}
      </h3>

      {/* 📋 Expense List */}
      <div style={{ marginTop: "20px" }}>
        {filtered.length === 0 ? (
          <p>No expenses</p>
        ) : (
          filtered.map((exp) => (
            <div
              key={exp._id}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                marginBottom: "10px",
              }}
            >
              <h4>{exp.title}</h4>
              <p>₹{exp.amount}</p>
              <p>{exp.category}</p>

              <button onClick={() => deleteExpense(exp._id)}>
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}