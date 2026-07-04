import { useEffect, useState } from "react";
import { setBudget, getBudgets } from "../services/budgetService";

function Budgets() {
  const [budgets, setBudgets] = useState([]);

  const [formData, setFormData] = useState({
    category: "",
    monthlyBudget: "",
  });

  const loadBudgets = async () => {
    try {
      const data = await getBudgets();
      setBudgets(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadBudgets();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await setBudget(formData);

      setFormData({
        category: "",
        monthlyBudget: "",
      });

      loadBudgets();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-4">

      <h2 className="mb-4">Budget Management</h2>

      <form onSubmit={handleSubmit} className="mb-4">

        <select
          className="form-control mb-3"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="">Select Category</option>
          <option>Food</option>
          <option>Transport</option>
          <option>Shopping</option>
          <option>Entertainment</option>
          <option>Bills</option>
          <option>Education</option>
          <option>Others</option>
        </select>

        <input
          type="number"
          className="form-control mb-3"
          name="monthlyBudget"
          placeholder="Monthly Budget"
          value={formData.monthlyBudget}
          onChange={handleChange}
          required
        />

        <button className="btn btn-success">
          Save Budget
        </button>

      </form>

      <table className="table table-bordered table-hover">

        <thead className="table-dark">
          <tr>
            <th>Category</th>
            <th>Monthly Budget (₹)</th>
          </tr>
        </thead>

        <tbody>

          {budgets.length === 0 ? (
            <tr>
              <td colSpan="2" className="text-center">
                No Budgets Found
              </td>
            </tr>
          ) : (
            budgets.map((budget) => (
              <tr key={budget._id}>
                <td>{budget.category}</td>
                <td>₹{budget.monthlyBudget}</td>
              </tr>
            ))
          )}

        </tbody>

      </table>

    </div>
  );
}

export default Budgets;