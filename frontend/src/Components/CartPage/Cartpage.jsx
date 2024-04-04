import React, { useState } from "react";
import { Table, Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import EmptycartPage from "./emptyPage.cart";
import "./cart.css"
import { deleteCartData } from "../../Redux/Cart/action";
import Loading from "../loading";
import { Link } from "react-router-dom";
import axios from "axios";

export const Cart = () => {
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(1);
  const token = useSelector((state) => state.token.token);
  const { cart, isLoading, error } = useSelector((state) => state.cartData);
  let total = cart.reduce((acc, curr) => acc + (curr.productId.price * curr.quantity), 0)

  const incrementQuantity = async(e) => {
    e.quantity += 1;
    updateProduct({ productId: e._id, quantity: e.quantity })
    setQuantity(e.quantity + 1);
  };

  const decrementQuantity = async (e) => {
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
    <div className="card_details" style={{ minHeight: "100vh" }}>
      <Container className="card p-2" fluid>
        <h2>Your Cart</h2>
        {cart && cart.length ? (
          <>
            <Table responsive className="cart-table mt-5">
              <tbody>
                {cart.map((e, i) => (
                  <tr className="table_row" key={e._id}>
                    <td >
                      <img className="ard-img-top" src={e.productId.image} alt="" />
                      <div>
                        <p>{e.productId.catagory}</p>
                        <p>₹{e.productId.price}</p>
                      </div>
                      <div className="d-flex justify-content-between" style={{width : `100%`}}>
                        <div className="">
                          <Button variant="outline-primary" className="me-2" onClick={() => decrementQuantity(e)} disabled={e.quantity <= 1}>
                            -
                          </Button>
                          <span>{e.quantity}</span>
                          <Button
                            variant="outline-primary"
                            className="ms-2"
                            onClick={() => incrementQuantity(e)}
                          >
                            +
                          </Button>
                        </div>
                        <Button className="6" variant="danger" onClick={() => dlt(e._id, i)}>
                          Remove
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <div className="d-flex justify-content-between align-items-center p-5">
              <p className="">Total Amount: <b>₹ {total}</b></p>
              <div>
                <Button onClick={handleCartCheckout} variant="secondary">
                  Checkout
                </Button>
              </div>
            </div>
          </>
        ) : (
          <EmptycartPage />
        )}
      </Container>
    </div>
  );
};
