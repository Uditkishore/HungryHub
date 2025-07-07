import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { deleteAllCartData } from "../../Redux/Cart/action";
import "./confirm.css";

const Confirmation = () => {
  const { cart } = useSelector((store) => store.cartData);
  const location = useLocation();
  const totalPrice = location.state?.totalPrice || 0;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(deleteAllCartData());
    alert("✅ Order Placed Successfully!");
    navigate("/");
  };

  return (
    <div className="confirmation-wrapper d-flex justify-content-center align-items-center py-5 px-3">
      <div className="confirmation-card bg-light text-dark p-4 rounded shadow-lg">
        <div className="text-center mb-4">
          <img
            className="success-icon mb-2"
            src="https://cdn-icons-png.flaticon.com/512/845/845646.png"
            alt="Order Success"
          />
          <h2 className="text-success">Order Confirmed!</h2>
        </div>

        <div className="mb-3">
          <h5>Total Price: <span className="text-primary">₹{totalPrice}</span></h5>
          <h6>Items Ordered: {cart.length}</h6>
        </div>

        {cart.length ? (
          <div className="order-items mt-3 mb-4">
            <h6>Shipping Address:</h6>
            <ul className="list-unstyled">
              {cart.map((e, i) => (
                <li key={i}>📍 {e.address}</li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="d-flex justify-content-center py-4">
            <div className="spinner-border text-success" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}

        <div className="text-center mt-4">
          <button onClick={handleSubmit} className="btn btn-success px-4">
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
