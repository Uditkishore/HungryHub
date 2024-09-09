import React, { useEffect, useState } from "react";
import { Button, Carousel, Toast } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import { getSingleProduct } from "../../Redux/SingleProduct/action";
import axios from "axios";
import { addToCart } from "../../Redux/Cart/action";
import { ToastContainer, toast } from 'react-toastify';
import Loading from "../loading";
import './productDetails.css'
import { BtnCustom } from "../button";
export const Productpage = () => {
  const [quantity, setQuantity] = useState(1);

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cart } = useSelector((state) => state.cartData);
  const singleData = useSelector((store) => store.singleProduct.item);
  const isLoading = useSelector((state) => state.singleProduct.isLoading);
  const { token } = useSelector((state) => state.token);

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleCart = async (product) => {
    let data = {
      productId: product._id,
      quantity: quantity
    };

    const exists = cart.find(item => item.productId._id === product._id);

    if (exists) {
      toast.info('🦄 Product already exists.');
    } else {
      if (!token) {
        toast.warn('🦄 Register to make a purchase.');
      } else {
        dispatch(addToCart(data, token));
      }
    }
  };


  useEffect(() => {
    dispatch(getSingleProduct(id));
    window.scrollTo(0, 0);
  }, [id]);

  const navigateLogin = () => {
    alert("You need to login first");
    navigate("/login");
  };

  if (isLoading) return <Loading />
  return (
    <div id="productDetailsPage" className="container mt-4 min-vh-100">
      <section className="mt-4 mb-5 py-5">
        <ToastContainer />
        <div className="row">
          <div className="col-lg-6">
            <div className="productImageContainer carousel slide" data-ride="carousel">
              <Carousel className="carousel-inner">
                <Carousel.Item className="carousel-item active border rounded">
                  <img className="image-design d-block w-100" src={`http://localhost:8080/${product.image}`} alt="Product" />
                </Carousel.Item>
                <Carousel.Item className="carousel-item border rounded">
                  <img className="image-design d-block w-100" src={`http://localhost:8080/${product.image}`} alt="Product" />
                </Carousel.Item>
                <Carousel.Item className="carousel-item border rounded">
                  <img className="image-design d-block w-100" src={`http://localhost:8080/${product.image}`} alt="Product" />
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
              <div className="row w-100">
                <BtnCustom className={"col font-bold fw-bolder mt-5 btn btn-outline-dark"} onClick={() => handleCart(singleData)} name={'Proceed Next'} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
