import { Link } from "react-router-dom";

function Landing() {
  return (
    <div className="container mt-5">

      <div className="text-center">

        <h1 className="display-4 text-primary fw-bold">
          SpendWise
        </h1>

        <p className="lead mt-3">
          Student Financial Wellness Platform
        </p>

        <p className="text-muted">
          Track your expenses, manage your budget,
          achieve savings goals and improve your
          financial habits.
        </p>

        <div className="mt-4">

          <Link to="/signup">
            <button className="btn btn-primary me-3">
              Get Started
            </button>
          </Link>

          <Link to="/login">
            <button className="btn btn-outline-primary">
              Login
            </button>
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Landing;