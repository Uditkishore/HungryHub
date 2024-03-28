import React, { useEffect, useState, useRef } from "react";
import { Table, Button, Container, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import EmptycartPage from "./emptyPage.cart";
import "./cart.css"
import { deleteCartData, fetchCartData } from "../../Redux/Cart/action";
import Loading from "../loading";

export const Cart = () => {
  const token = useSelector((state) => state.token.token);
  const { cart, isLoading, error } = useSelector((state) => state.cartData);
  let total = cart.reduce((acc, curr) => acc + curr.productId.price, 0)

  const dispatch = useDispatch();

  const dlt = (id, index) => {
    dispatch(deleteCartData(id, token))
    cart.splice(index, 1)
  }

  if (isLoading) return <Loading />
  return (
    <div className="card_details" style={{ padding: 20, minHeight: "100vh" }}>
      <Container fluid>
        <h2 className="mb-4">Your Cart</h2>
        {cart && cart.length ? (
          <>
            <Table responsive className="cart-table">
              <thead>
                <tr>
                  <th>Photo</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((e, i) => (
                  <tr className="table_row" key={e._id}>
                    <td><img src={e.productId.image} style={{ width: "100px", height: "100px" }} alt="" /></td>
                    <td><p>{e.productId.catagory}</p></td>
                    <td><p>₹{e.productId.price}</p></td>
                    <td>
                      <div className="d-flex align-items-center">
                        <Button variant="outline-primary" className="me-2" onClick={() => changeData(e._id, -1)} disabled={e.qnty <= 1}>
                          -
                        </Button>
                        <span>{e.quantity}</span>
                        <Button
                          variant="outline-primary"
                          className="ms-2"
                          onClick={() => changeData(e._id, 1)}
                        >
                          +
                        </Button>
                      </div>
                    </td>
                    <td>
                      <Button variant="danger" onClick={() => dlt(e._id, i)}>
                        Remove
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <div className="d-flex justify-content-between">
              <p className="text-center">Total: ₹ {total}</p>
              <div>
                {/* <Link to={"/checkout"}> */}
                  <Button disabled={true} variant="secondary">Checkout</Button>
                {/* </Link> */}
                <p>Checkout work is in progress</p>
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
