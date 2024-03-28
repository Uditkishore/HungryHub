import React from "react";
import "./loginpage.css";
import LoginComp from "./LoginComp";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router";
import { loginUser } from "../../Redux/Auth/action";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

function LoginPage() {
  const dispatch = useDispatch();

  const { token, loading, error } = useSelector(
    (state) => state.token,
    shallowEqual
  );

  const HandleLogin = ({ email, password }) => {
    dispatch(loginUser({ email, password }));
  };

  if (token) {
    return <Navigate to="/" />;
  }

  if (loading) {
    return (
      <div id="loader">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }
  
  return (
    <div>
      {error && (
        <div className="text-center"> Username and password is incorrect </div>
      )}
      <div>
        <LoginComp HandleLogin={HandleLogin} />
      </div>
    </div>
  );
}

export default LoginPage;
