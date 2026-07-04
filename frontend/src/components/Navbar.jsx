import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div style={{ display: "flex", gap: "20px", padding: "10px" }}>
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      <Link to="/signup">Signup</Link>
      <Link to="/dashboard">Dashboard</Link>
      <Link className="nav-link" to="/expenses">Expenses</Link>
      <Link className="nav-link" to="/budgets">Budgets</Link>
      <li className="nav-item">
        <Link className="nav-link" to="/goals">
          Savings Goals
        </Link>
      </li>
    </div>
  );
}