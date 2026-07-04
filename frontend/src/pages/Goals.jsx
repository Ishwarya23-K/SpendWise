import { useState, useEffect } from "react";
import {
  addGoal,
  getGoals,
  updateGoal,
  deleteGoal,
} from "../services/goalService";

function Goals() {
  const [goals, setGoals] = useState([]);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    goalName: "",
    targetAmount: "",
    currentAmount: "",
  });

  const loadGoals = async () => {
    try {
      const data = await getGoals();
      setGoals(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadGoals();
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
      if (editId) {
        await updateGoal(editId, formData);
        setEditId(null);
      } else {
        await addGoal(formData);
      }

      setFormData({
        goalName: "",
        targetAmount: "",
        currentAmount: "",
      });

      loadGoals();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (goal) => {
    setEditId(goal._id);

    setFormData({
      goalName: goal.goalName,
      targetAmount: goal.targetAmount,
      currentAmount: goal.currentAmount,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this goal?")) {
      await deleteGoal(id);
      loadGoals();
    }
  };

  return (
    <div className="container mt-4">

      <h2 className="mb-4">Savings Goals</h2>

      <form onSubmit={handleSubmit} className="mb-4">

        <input
          type="text"
          name="goalName"
          className="form-control mb-3"
          placeholder="Goal Name"
          value={formData.goalName}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="targetAmount"
          className="form-control mb-3"
          placeholder="Target Amount"
          value={formData.targetAmount}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="currentAmount"
          className="form-control mb-3"
          placeholder="Current Amount"
          value={formData.currentAmount}
          onChange={handleChange}
          required
        />

        <button className="btn btn-success">
          {editId ? "Update Goal" : "Add Goal"}
        </button>

      </form>

      {goals.map((goal) => {
        const progress = Math.min(
          (goal.currentAmount / goal.targetAmount) * 100,
          100
        );

        return (
          <div className="card mb-3" key={goal._id}>
            <div className="card-body">

              <h5>{goal.goalName}</h5>

              <p>
                Saved ₹{goal.currentAmount} of ₹{goal.targetAmount}
              </p>

              <div className="progress mb-3">
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{ width: `${progress}%` }}
                >
                  {progress.toFixed(0)}%
                </div>
              </div>

              <button
                className="btn btn-warning btn-sm me-2"
                onClick={() => handleEdit(goal)}
              >
                Edit
              </button>

              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleDelete(goal._id)}
              >
                Delete
              </button>

            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Goals;