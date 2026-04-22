import API from "../api/axios";

export default function ExpenseList({ expenses, refresh }) {
  const deleteExpense = async (id) => {
    await API.delete(`/expenses/${id}`);
    refresh();
  };

  return (
    <div>
      {expenses.map(e => (
        <div key={e._id} className="card">
          <h4>{e.title}</h4>
          <p>₹{e.amount} | {e.category}</p>
          <button onClick={() => deleteExpense(e._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}