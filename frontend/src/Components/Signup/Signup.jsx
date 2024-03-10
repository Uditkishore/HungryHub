import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [register, setRegister] = useState({
    username: "",
    email: "",
    password: "",
    mobileNumber: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setRegister({
      ...register,
      [id]: value,
    });
    validateField(id, value);
  };

  const validateField = (id, value) => {
    let error = "";
    if (id === "username" && value.trim() === "") {
      error = "Name is required";
    } else if (id === "email" && !/\S+@\S+\.\S+/.test(value)) {
      error = "Invalid email address";
    } else if (id === "password" && value.length < 6) {
      error = "Password must be at least 6 characters long";
    } else if (id === "mobileNumber" && !/^\d{10}$/.test(value)) {
      error = "Invalid mobile number";
    }
    setErrors({ ...errors, [id]: error });
  };

  const handleSubmit = () => {
    if (Object.values(errors).every((error) => error === "")) {
      axios
        .post(`http://localhost:8080/user/signup`, register)
        .then((res) => {
          alert("Registration successful");
          navigate("/login");
        })
        .catch((e) => {
          alert(e.response.data.message);
        });
    } else {
      alert("Please fill out the form correctly");
    }
  };

  return (
    <div className="container">
      <h2 className="mt-5">Create an Account</h2>
      <div className="row mt-4">
        <div className="col-md-6 offset-md-3">
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Name"
              value={register.username}
              onChange={handleChange}
            />
            {errors.username && (
              <div className="text-danger">{errors.username}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Email"
              value={register.email}
              onChange={handleChange}
            />
            {errors.email && (
              <div className="text-danger">{errors.email}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
              value={register.password}
              onChange={handleChange}
            />
            {errors.password && (
              <div className="text-danger">{errors.password}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="mobileNumber" className="form-label">
              Phone Number
            </label>
            <input
              type="tel"
              className="form-control"
              id="mobileNumber"
              placeholder="Mobile Number"
              value={register.mobileNumber}
              onChange={handleChange}
            />
            {errors.mobileNumber && (
              <div className="text-danger">{errors.mobileNumber}</div>
            )}
          </div>
          <button
            type="button"
            className="btn btn-primary w-100"
            onClick={handleSubmit}
            disabled={
              Object.values(errors).some((error) => error !== "") ||
              Object.values(register).some((val) => val === "")
            }
          >
            Create an Account
          </button>
        </div>
      </div>
      <div className="mt-3 text-center">
        <p>
          Already have an Account?
          <span className="cursor" onClick={() => navigate("/login")}>
            {" "}
            Sign In{" "}
          </span>
        </p>
        <div>
          <p>
            By selecting 'Create an Account' you are agreeing to the Pro Xtra
            Terms and
          </p>
          <p>
            Conditions, Privacy and Security Statement, & My Account Terms and
            Conditions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
