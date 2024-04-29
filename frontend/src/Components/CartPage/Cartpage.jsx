import React, { useState } from "react";
import { Table, Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import EmptycartPage from "./emptyPage.cart";
import "./cart.css"
import { deleteCartData } from "../../Redux/Cart/action";
import Loading from "../loading";
import { Link } from "react-router-dom";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { BtnCustom } from "../button";

export const Cart = () => {
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(1);
  const token = useSelector((state) => state.token.token);
  const { cart, isLoading, error } = useSelector((state) => state.cartData);
  let total = cart.reduce((acc, curr) => acc + (curr.productId.price * curr.quantity), 0)

  const incrementQuantity = async (e) => {
    console.log("e", e.quantity)
    e.quantity += 1;
    updateProduct({ productId: e._id, quantity: e.quantity })
    setQuantity(e.quantity + 1);
  };

  const decrementQuantity = async (e) => {
    if (e.quantity <= 1) return
    e.quantity -= 1;
    updateProduct({ productId: e._id, quantity: e.quantity })
    setQuantity(e.quantity - 1);
  };

  const dlt = (id, index) => {
    dispatch(deleteCartData(id, token))
    cart.splice(index, 1)
  }  

  const updateProduct = async (data) => {
    try {
      return await axios.post(`${process.env.BASEURL}/cart/updateCart`, data, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      });
    } catch (error) {
      console.log("Quantity update error:", error);
      throw error;
    }
  }

  const handleCartCheckout = () => {
    try {
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
    } catch (error) {
      console.log("error", error);
    }
  }

  if (isLoading) return <Loading />
  return (
    <div className="cart-container">
      <div className="cart-items">
        <h1 className="heading">Shopping Cart</h1>
        <div className="d-none d-sm-block table table_container">
          <div className="container">
            <div className="row d-none d-md-flex borders">
              <div className="col-md-4 "></div>
              <div className="col-md-2 col-sm-6 text-center">Name</div>
              <div className="col-md-2 col-sm-6 text-center">SubTotal</div>
              <div className="col-md-3 col-sm-6 text-center">Quantity</div>
              <div className="col-md-1 col-sm-6 text-center"></div>
            </div>
            {cart.map((element, index) => {
              const item = element.productId;
              return (
                <div className="row borders" key={index}>
                  <div className="table-data col-md-4 col-sm-6">
                    <img className="img-fluid" src={item.image} alt="..." />
                  </div>
                  <div className="table-data col-md-2 col-sm-6">{item.name}</div>
                  <div className="table-data col-md-2 col-sm-6">{item.price * element.quantity}/-</div>
                  <div className="table-data col-md-3 col-sm-6 table-counter">
                    <button className="btn btn-outline-primary" onClick={() => decrementQuantity(element)}>-</button>
                    <h6>{element.quantity}</h6>
                    <button className="btn btn-outline-primary" onClick={() => incrementQuantity(element)}>+</button>
                  </div>
                  <div onClick={() => dlt(element)} className="table-data col-md-1 col-sm-6">
                    <MdDelete />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {/* Small Screen */}
        <div className="d-block d-sm-none table table_container">
          <div className="container">
            {cart.map((element, index) => {
              const item = element.productId;
              return (
                <div className="shadow my-3 my-sm-none m-sm-2">
                  <div>
                    <img className="card-img-top" src={item.image} />
                  </div>
                  <div className="row">
                    <div className="col">
                      {item.name}
                    </div>
                  </div>
                  <div className="row w-100  d-flex  align-items-center">
                    <div className="col-6 btn btn-outline-danger"><MdDelete /></div>
                    <div className="col-6 text-center">
                      <b>{item.price * element.quantity}/-</b>
                    </div>
                  </div>
                  <div className="row w-100">
                    <div onClick={() => decrementQuantity(element)} className="col-4 btn btn-outline-dark">
                      -
                    </div>
                    <div onClick={() => decrementQuantity(element)} className="col-4 text-center m-auto">
                      <h6>{element.quantity}</h6>
                    </div>
                    <div onClick={() => incrementQuantity(element)} className="col-4 btn btn-outline-dark">
                      +
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="row cart-details">
        <div className="row mt-4 d-flex align-items-center m-auto">
          <div className="col-8">
            <input type="text" placeholder="Appy coupon" />
          </div>
          <div onClick={() => decrementQuantity(element)} className="col-4 btn btn-outline-dark">
            Redeem
          </div>
        </div>
        <h1 className="py-5">Cart Totals</h1>
        <div className="row borders p-2">
          <div className="col-6">SubTotal</div>
          <div className="col-6 text-end">₹<b>{total}</b></div>
        </div>
        <div className="row py-3">
          <div className="col-4"> GST:</div>
          <div className="col-4 text-center"> (5% )</div>
          <div className="col-4 text-end">₹{Math.floor(total * .05)}</div>
        </div>
        <div className="row py-3">
          <div className="col-4"> Discount:</div>
          <div className="col-4 text-center">(10% )</div>
          <div className="col-4 text-end">₹{Math.floor(total * .10)}</div>
        </div>
        <div className="row py-3 borderBot">
          <div className="col-6"> Delivery Charge:</div>
          <div className="col-6 text-end">₹40</div>
        </div>
        <div className="row borderBot">
          <div className="col-6">Total:</div>
          <div className="col-6 text-end">₹<b>{Math.floor(total + (total * .05) - (total * .15) + 40)}</b></div>
        </div>
        <div className="row w-100">
          <BtnCustom onClick={()=> decrementQuantity(element)} name={'Checkout'}/>
        </div>
      </div>
    </div>
  );
};