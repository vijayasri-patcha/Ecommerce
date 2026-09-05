import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../redux/authSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("");

  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading } = useSelector((state) => state.auth);

  const validate = () => {
    let error = {};

    if (name === "") error.name = "Name is required";
    if (email === "") error.email = "Email is required";
    else if (!email.includes("@")) error.email = "Invalid Email";

    if (password.length < 8)
      error.password = "Password must be at least 8 characters";

    if (type === "") error.type = "Select a type";

    setErrors(error);

    return Object.keys(error).length === 0;
  };

  const onClickSignup = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    const result = await dispatch(
      signupUser({
        name,
        email,
        password,
        type,
      })
    );

    if (signupUser.fulfilled.match(result)) {
      toast.success("Signup Successful");
      navigate("/login");
    }

    if (signupUser.rejected.match(result)) {
      toast.error(result.payload || result.error.message);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <div className="card p-4 shadow">
        <h2 className="text-center mb-4">Sign Up</h2>

        <form onSubmit={onClickSignup}>
          <div className="mb-3">
            <label>Name</label>
            <input
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <small className="text-danger">{errors.name}</small>
          </div>

          <div className="mb-3">
            <label>Email</label>
            <input
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <small className="text-danger">{errors.email}</small>
          </div>

          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <small className="text-danger">{errors.password}</small>
          </div>

          <div className="mb-3">
            <label>Type</label>
            <select
              className="form-select"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="">Select Type</option>
              <option value="Customer">Customer</option>
              <option value="Seller">Seller</option>
            </select>
            <small className="text-danger">{errors.type}</small>
          </div>

          <button
            className="btn btn-success w-100"
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;