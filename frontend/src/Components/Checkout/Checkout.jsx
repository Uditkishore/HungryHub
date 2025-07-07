import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchCheckoutData } from "../../Redux/Checkout/action";
import { useLocation } from "react-router";
import "./checkout.css";

export const Checkout = () => {
  const [order, setOrder] = useState({});
  const [flag, setFlag] = useState(true);
  const location = useLocation();
  const totalPrice = location.state?.total || 0;

  const inputOrders = (e) => {
    const { id, value } = e.target;
    setOrder({
      ...order,
      [id]: value,
      price: totalPrice,
    });
    if (Object.keys(order).length == 7) {
      setFlag(false);
    }
  };
  const navigate = useNavigate();

  const sendOrder = () => {
    navigate("/confirm", {
      state: {
        totalPrice
      }
    });
  };

  return (
    <div className="checkout-wrapper py-5 px-3">
      <div className="checkout-card shadow rounded p-4 mx-auto">
        <div className="text-center mb-4">
          <img
            className="checkout-logo"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXCB2nm9hjvNvsZxjiNvWjJWgSVw65Erq2es9hBXxPZWqnRkW-4oi3SwNwIMZwg3dWYIU&usqp=CAU"
            alt="logo"
          />
        </div>

        <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-3">
          <h5>Amount Payable</h5>
          <h3 className="text-success fw-bold">₹{totalPrice}</h3>
        </div>

        <h5 className="mb-3">Pay with debit or credit card</h5>

        <div className="alert alert-light d-flex align-items-start gap-2">
          <img
            style={{ width: 30 }}
            src="https://img.icons8.com/ios-glyphs/344/info.png"
            alt="info"
          />
          <small>
            The merchant requires a U.S. billing address for all purchases made using PayPal.
          </small>
        </div>

        <div className="text-center mb-4">
          <img
            className="img-fluid"
            style={{ maxWidth: "250px" }}
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw1NbG6qb5VaSLkJz25TvH28G--0J7egeafw&usqp=CAU"
            alt="payment"
          />
        </div>

        <h5 className="mb-3">Billing Address</h5>
        <div className="row g-2 mb-2">
          <div className="col-md-6">
            <input onChange={inputOrders} id="firstname" className="form-control" placeholder="First Name" />
          </div>
          <div className="col-md-6">
            <input onChange={inputOrders} id="lastname" className="form-control" placeholder="Last Name" />
          </div>
        </div>

        <input
          onChange={inputOrders}
          id="address1"
          className="form-control mb-2"
          placeholder="Address Line 1"
        />
        <input
          onChange={inputOrders}
          id="town"
          className="form-control mb-2"
          placeholder="Town/City"
        />
        <input
          onChange={inputOrders}
          id="country"
          className="form-control mb-2"
          placeholder="State/Country"
        />
        <input
          onChange={inputOrders}
          id="pin"
          className="form-control mb-2"
          placeholder="ZIP Code"
        />
        <input
          onChange={inputOrders}
          id="mobile"
          className="form-control mb-3"
          type="tel"
          placeholder="Mobile Number"
        />

        <p className="text-muted small">
          By clicking, you agree to the <span className="text-primary">User Agreement</span> and <span className="text-primary">Privacy Policy</span>.
        </p>

        <div className="text-center mt-4">
          <button
            onClick={sendOrder}
            disabled={flag}
            className="btn btn-primary w-100"
          >
            Agree and Continue
          </button>
        </div>

        <hr className="my-4" />

        <div className="text-center">
          <button
            onClick={() => navigate("/")}
            className="btn btn-link text-decoration-underline text-secondary"
          >
            Cancel and return to merchant
          </button>
        </div>

        <footer className="mt-4 text-muted small">
          <div className="d-flex justify-content-between">
            <div className="d-flex gap-3">
              <span>Legal</span>
              <span>User Agreement</span>
              <span>Privacy</span>
            </div>
            <span>© 1999 - 2025</span>
          </div>
          <p className="mt-2">
            PayPal Services in India are provided by PayPal Payments Private Limited. Read the{" "}
            <span className="text-primary">Terms and Conditions</span>.
          </p>
        </footer>
      </div>
    </div>
  );

};
