import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { userLogin } from "../Features/AuthFeature";
import { toast, ToastContainer } from "react-toastify";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { token, isLoading, error } = useSelector((state) => state.login);

  //   console.log(error, "error from login");

  useEffect(() => {
    if (token) {
      toast.success("Login Successfully", {
        onClose: () => navigate("/home"),
        autoClose: 1000,
        position: "top-right",
      });
    }
  }, [token]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(userLogin(formData));

    setTimeout(() => {
      if (error) {
        toast.error(error, {
          onClose: () => navigate("/"),
          autoClose: 1000,
          position: "top-right",
        });
      }
    }, 100);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="user-container">
      <ToastContainer />
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
          <a href="/">
            <p>Register New Account</p>
          </a>
        </form>
      </div>
    </div>
  );
};

export default Login;
