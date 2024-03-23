import React, { useEffect, useState } from "react";
import { Button, Carousel } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import { getSingleProduct } from "../../Redux/SingleProduct/action";
import axios from "axios";
import { addToCart } from "../../Redux/Cart/action";

export const Productpage = () => {
  const [quantity, setQuantity] = useState(1);

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const singleData = useSelector((store) => store.singleProduct.item);
  const isLoading = useSelector((state) => state.singleProduct.isLoading);
  const token = useSelector((state) => state.isAuth.user.token);

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleCart = async () => {

    let data = {
      productId: singleData._id,
      quantity: quantity
    }

    dispatch(addToCart(data,token))
    navigate("/cart")
  }

  useEffect(() => {
    dispatch(getSingleProduct(id));
    window.scrollTo(0, 0);
  }, [id]);

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
                <Carousel.Item className="border rounded">
                  <img className="d-block w-100" src={singleData.image} alt="Product" />
                </Carousel.Item>
              </Carousel>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="productDetails">
              <div className="d-flex p-3 justify-content-between align-items-center border-bottom">
                <h2 className="text-uppercase fw-bold">{singleData.name}</h2>
                <p className="text-success">
                  <strong>Rating:</strong> {singleData.rating} ★
                </p>
              </div>
              <p className="mb-4 mt-3">
                <strong>Price:</strong> ₹{singleData.price}
              </p>
              <p className="mb-4">
                <strong>Description:</strong> {singleData.description}
              </p>
              <div className="d-flex align-items-center mb-4">
                <p className="me-3">Quantity:</p>
                <div className="input-group">
                  <button className="btn btn-outline-secondary" type="button" onClick={decrementQuantity}> - </button>
                  <input type="text" className="form-control text-center" value={quantity} readOnly />
                  <button className="btn btn-outline-secondary" type="button" onClick={incrementQuantity} > + </button>
                </div>
              </div>
              <div className="buttonDiv">
                {token ? (
                  <Button onClick={handleCart} variant="primary" className="w-100" > Add to Cart </Button>
                ) : (
                  <button className="btn btn-primary w-100" onClick={navigateLogin} >
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
