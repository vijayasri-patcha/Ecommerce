import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchCart } from "../redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/authSlice";
import { toast } from "react-toastify";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, isAuthenticated, user } = useSelector(
    (state) => state.auth
  );

  const onclicklogin = async () => {
    const result = await dispatch(
      loginUser({
        email,
        password,
      })
    );

    if (loginUser.rejected.match(result)) {
      toast.error(result.payload || result.error.message);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchCart());
      toast.success("Login successful!");

      if (user?.type === "Customer") {
        navigate("/home");
      } else {
        navigate("/add-product");
      }
    }
  }, [isAuthenticated, user, dispatch, navigate]);

  return (
    <div>
      <h2>Login</h2>

      <div className="form-group">
        <label htmlFor="email">Email address</label>

        <input
          type="email"
          className="form-control"
          id="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>

        <input
          type="password"
          className="form-control"
          id="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button
        className="btn btn-primary"
        onClick={onclicklogin}
        disabled={loading}
      >
        {loading ? "Logging..." : "Login"}
      </button>
    </div>
  );
}

export default Login;