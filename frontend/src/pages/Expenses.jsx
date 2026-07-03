import { useState, useEffect } from "react";
import {
  addExpense,
  getExpenses,
  updateExpense,
  deleteExpense,
} from "../services/expenseService";

function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [editId, setEditId] = useState(null);

  const [categoryFilter, setCategoryFilter] = useState("");
  const [monthFilter, setMonthFilter] = useState("");

  const [formData, setFormData] = useState({
    amount: "",
    category: "",
    description: "",
    date: "",
  });

  const loadExpenses = async () => {
    try {
      const data = await getExpenses();
      setExpenses(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadExpenses();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEdit = (expense) => {
    setEditId(expense._id);

    setFormData({
      amount: expense.amount,
      category: expense.category,
      description: expense.description,
      date: expense.date.substring(0, 10),
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await updateExpense(editId, formData);
      } else {
        await addExpense(formData);
      }

      setEditId(null);

      setFormData({
        amount: "",
        category: "",
        description: "",
        date: "",
      });

      loadExpenses();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this expense?")) {
      await deleteExpense(id);
      loadExpenses();
    }
  };

  const filteredExpenses = expenses.filter((expense) => {
    const categoryMatch =
      categoryFilter === "" ||
      expense.category === categoryFilter;

    const monthMatch =
      monthFilter === "" ||
      expense.date.substring(0, 7) === monthFilter;

    return categoryMatch && monthMatch;
  });

  return (
    <div className="container mt-4">

      <h2 className="mb-4">Expense Manager</h2>

      <form onSubmit={handleSubmit} className="mb-4">

        <input
          type="number"
          name="amount"
          placeholder="Amount"
          className="form-control mb-2"
          value={formData.amount}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          className="form-control mb-2"
          value={formData.category}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="description"
          placeholder="Description"
          className="form-control mb-2"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <input
          type="date"
          name="date"
          className="form-control mb-3"
          value={formData.date}
          onChange={handleChange}
          required
        />

        <button className="btn btn-primary">
          {editId ? "Update Expense" : "Add Expense"}
        </button>

      </form>

      <div className="row mb-4">

        <div className="col-md-6 mb-2">

          <select
            className="form-control"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">All Categories</option>
            <option>Food</option>
            <option>Transport</option>
            <option>Shopping</option>
            <option>Entertainment</option>
            <option>Bills</option>
            <option>Education</option>
            <option>Others</option>
          </select>

        </div>

        <div className="col-md-6 mb-2">

          <input
            type="month"
            className="form-control"
            value={monthFilter}
            onChange={(e) => setMonthFilter(e.target.value)}
          />

        </div>

      </div>

      <table className="table table-bordered table-hover">

        <thead className="table-dark">
          <tr>
            <th>Amount</th>
            <th>Category</th>
            <th>Description</th>
            <th>Date</th>
            <th width="170">Action</th>
          </tr>
        </thead>

        <tbody>

          {filteredExpenses.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center">
                No expenses found
              </td>
            </tr>
          ) : (
            filteredExpenses.map((expense) => (
              <tr key={expense._id}>
                <td>₹{expense.amount}</td>
                <td>{expense.category}</td>
                <td>{expense.description}</td>
                <td>{expense.date.substring(0, 10)}</td>

                <td>

                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => handleEdit(expense)}
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(expense._id)}
                  >
                    Delete
                  </button>

                </td>
              </tr>
            ))
          )}

        </tbody>

      </table>

    </div>
  );
}

export default Expenses;