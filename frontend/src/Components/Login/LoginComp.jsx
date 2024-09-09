import React, { useState } from "react";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginComp = ({ HandleLogin }) => {
  const [disable, setDisable] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  const handleChange = (e) => {
    const { id, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [id]: value,
    }));
  };

  const userData = () => {
    if (user && user.email && user.email.length > 2 && user.password && user.password.length >= 5) {
      return HandleLogin(user);
    } else {
      toast("Email and password format is incorrect.");
    }
  };


  return (
    <div id="contain">
      <ToastContainer />
      <h2>Sign In or Create an Account</h2>
      <div id="details">
        <div>
          <p>User Name</p>
          <input
            onChange={handleChange}
            type="email"
            name=""
            placeholder="Enter your username" // admin@gmail.com
            id="email"
          />
        </div>
        <div>
          <p>Password</p>
          <input
            onChange={handleChange}
            type="password"
            placeholder="Please enter password" // admin12
            id="password"
          />
        </div>
      </div>
      <button
        className="w-100 btn btn-primary"
        onClick={userData}
        disabled={disable}
      >
        Login
      </button>
      <hr />
      <p className="street101">Don't Have an Account?</p>
      <button
        className="w-100 btn btn-primary"
        onClick={() => navigate("/signup")}
      >
        Create an Account
      </button>
      <div id="termsConds" className="street101">
        <p>
          By selecting 'Sign In' you are agreeing to the Pro Xtra Terms and
          Conditions,
        </p>
        <p>
          Privacy and Security Statement, & My Account Terms and Conditions. For
        </p>
        <p>Two-Factor Authentication, message and data rates may apply.</p>
      </div>
    </div>
  );
};

export default LoginComp;
