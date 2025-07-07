import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getSingleProduct } from "../../Redux/SingleProduct/action";
import { addToCart } from "../../Redux/Cart/action";
import Loading from "../loading";
import "./productDetails.css";
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

  const incrementQuantity = () => setQuantity(quantity + 1);
  const decrementQuantity = () => quantity > 1 && setQuantity(quantity - 1);

  const handleCart = (product) => {
    if (!token) return toast.warn("🦄 Register to make a purchase.");

    const exists = cart.find((item) => item.productId._id === product._id);
    if (exists) return toast.info("🦄 Product already exists.");
    
    dispatch(addToCart({ productId: product._id, quantity }, token));
  };

  useEffect(() => {
    dispatch(getSingleProduct(id));
    window.scrollTo(0, 0);
  }, [id]);

  if (isLoading) return <Loading />;

  return (
    <div id="productDetailsPage" className="container mt-4 min-vh-100">
      <ToastContainer />
      <div className="row py-5">
        <div className="col-md-6 d-flex justify-content-center align-items-center">
          <div className="product-image-box shadow rounded">
            <img src={singleData.image} alt="Product" className="img-fluid rounded" />
          </div>
        </div>
        <div className="col-md-6">
          <div className="productDetails p-4 border rounded shadow-sm">
            <h2 className="fw-bold text-uppercase">{singleData.name}</h2>
            <p className="text-success mt-2 mb-3">
              <strong>Rating:</strong> {singleData.rating} ★
            </p>
            <p><strong>Price:</strong> ₹{singleData.price}</p>
            <p><strong>Description:</strong> {singleData.description}</p>

            <div className="d-flex align-items-center mt-4">
              <strong className="me-3">Quantity:</strong>
              <div className="input-group quantity-input w-auto">
                <button className="btn btn-outline-dark" type="button" onClick={decrementQuantity}>-</button>
                <input type="text" className="form-control text-center" value={quantity} readOnly />
                <button className="btn btn-outline-dark" type="button" onClick={incrementQuantity}>+</button>
              </div>
            </div>

            <div className="mt-5">
              <BtnCustom
                className="btn btn-dark w-100 fw-bold py-2"
                onClick={() => handleCart(singleData)}
                name="Add to Cart"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
