import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { userLogin } from "../Features/AuthFeature";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { user, token, isLoggedIn, isLoading, error } = useSelector(
    (state) => state.login
  );

  //   console.log(error, "error from login");

  useEffect(() => {
    if (token) {
      navigate("/home");
    }
  }, [token]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(userLogin(formData));
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="user-container">
      <div className="user-details">
        {isLoading ? <h1>Loading...</h1> : <h1>Login</h1>}
        <form action="" onSubmit={handleSubmit}>
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          <button type="submit">Login</button>
        </form>
        {error && <p>{error}</p>}
      </div>
    </div>
  );
};

export default Login;
