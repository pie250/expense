import { useState } from "react";
import API from "../api/axios";

export default function ExpenseForm({ refresh }) {
  const [data, setData] = useState({
    title: "",
    amount: "",
    category: ""
  });

  const handleSubmit = async () => {
    await API.post("/expenses", data);
    refresh();
  };

  return (
    <div>
      <input placeholder="Title" onChange={e => setData({...data, title:e.target.value})}/>
      <input type="number" placeholder="Amount" onChange={e => setData({...data, amount:e.target.value})}/>
      <input placeholder="Category" onChange={e => setData({...data, category:e.target.value})}/>
      <button onClick={handleSubmit}>Add Expense</button>
    </div>
  );
}