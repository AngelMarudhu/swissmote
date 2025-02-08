import React, { useEffect, useState } from "react";
import { userRegister } from "../Features/AuthFeature";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import "../Css/Auth.css";

const UserRegisteration = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isRegistered, error } = useSelector((state) => state.login);

  useEffect(() => {
    if (isRegistered) {
      navigate("/login");
      localStorage.removeItem("isRegistered");
    }
  }, [isRegistered]);

  //   console.log(error);

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(userRegister(formData));
  };

  return (
    <div className="user-container">
      <div className="user-details">
        <h2>User Registeration</h2>
        <form action="" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            name="name"
            required={true}
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => {
              handleChange(e);
            }}
            value={formData.email}
            required={true}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => {
              handleChange(e);
            }}
            value={formData.password}
            required={true}
            minLength={4}
            maxLength={10}
          />
          <button type="submit">Register</button>
          <a href="/login">
            <p>Already have an account</p>
          </a>
        </form>
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default UserRegisteration;
