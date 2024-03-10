import React, { useEffect, useState } from "react";
import { Table, Button, Carousel } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import { postCartRequest } from "../../Redux/Cart/action";
import { fetchCartData } from "../../Redux/Cart/action";
import { getSingleProduct } from "../../Redux/SingleProduct/action";

export const Productpage = () => {
  const singleData = useSelector((store) => store.singleProduct.item);
  const isLoading = useSelector((state) => state.singleProduct.isLoading);

  const user = JSON.parse(localStorage.getItem("user"));
  const cart = useSelector((e) => e.cartData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const [quantity, setQuantity] = useState(1);

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  useEffect(() => {
    // Fetch single product data and scroll to the top
    dispatch(getSingleProduct(id));
    window.scrollTo(0, 0); // Scroll to the top
  }, [id]);

  const sendCartItem = (cartdata) => {
    cartdata.userid = user.user._id;
    let bool = false;
    let cartData = cart.cart;
    cartData.map((e) => {
      if (e.id == cartdata.id) {
        bool = true;
      }
    });
    if (bool) {
      alert("item already added");
    } else {
      dispatch(postCartRequest(cartdata));
      alert("item added to cart");
      dispatch(fetchCartData());
    }
  };

  const navigateLogin = () => {
    alert("You need to login first");
    navigate("/login");
  };

  if (isLoading) {
    return (
      <div
        className="min-vh-100 w-100 d-flex justify-content-center align-items-center"
      >
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div id="productDetailsPage" className="container mt-4 min-vh-100">
      <section className="mt-4 mb-5 py-5">
        <div className="row">
          <div className="col-lg-6">
            <div className="productImageContainer">
              <Carousel>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={singleData.image}
                    alt="Product"
                  />
                </Carousel.Item>
                {/* Add additional Carousel.Items for more images */}
              </Carousel>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="productDetails">
              <div className="d-flex justify-content-between align-items-center border-bottom mb-3 pb-3">
                <h2 className="text-uppercase fw-bold">{singleData.name}</h2>
                <p className="text-success">
                  <strong>Rating:</strong> {singleData.rating} ★
                </p>
              </div>
              <p className="mb-4">
                <strong>Price:</strong> ₹{singleData.price}
              </p>
              <p className="mb-4">
                <strong>Description:</strong> {singleData.description}
              </p>
              <div className="d-flex align-items-center mb-4">
                <p className="me-3">Quantity:</p>
                <div className="input-group">
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={decrementQuantity}
                  >
                    -
                  </button>
                  <input
                    type="text"
                    className="form-control text-center"
                    value={quantity}
                    readOnly
                  />
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={incrementQuantity}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="buttonDiv">
                {user ? (
                  <Button
                    onClick={() => sendCartItem({ ...singleData, quantity })}
                    variant="primary"
                    className="w-100"
                  >
                    Add to Cart
                  </Button>
                ) : (
                  <button
                    className="btn btn-primary w-100"
                    onClick={navigateLogin}
                  >
                    Add to Cart
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
