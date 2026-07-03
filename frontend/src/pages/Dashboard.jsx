import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Dashboard() {

  const { user, logout } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="container mt-5">

      <div className="card shadow p-4">

        <h2 className="text-primary">
          Welcome, {user?.name}
        </h2>

        <p className="mt-3">
          This is your SpendWise Dashboard.
        </p>

        <button
          className="btn btn-danger mt-3"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>

    </div>
  );
}

export default Dashboard;