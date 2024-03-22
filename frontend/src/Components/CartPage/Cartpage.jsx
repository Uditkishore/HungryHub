import React, { useEffect, useState, useRef } from "react";
import { Table, Button, Container, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import EmptycartPage from "./emptyPage.cart";
import "./cart.css"

export const Cart = () => {
  const token = useSelector((state) => state.isAuth.user.token);

  const dispatch = useDispatch();
  let total = useRef(0);

  const [cartData, setCartData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCartData()
  }, []);


  const fetchCartData = async () => {
    try {
      const { data } = await axios.get(`${process.env.BASEURL}/cart/products`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      })
      setCartData(data.data)
      console.log(data.data)
    } catch (error) {
      console.log("Cart Error", error)
    }
  }


  return (
    <div className="card_details" style={{ padding: 20, minHeight: "100vh" }}>
    <Container fluid>
      <h2 className="mb-4">Your Cart</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {cartData && cartData.length ? (
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
              {cartData.map((e) => (
                <tr className="table_row" key={e._id}>
                  <td>
                    <img
                      src={e.productId.image}
                      style={{ width: "100px", height: "100px" }}
                      alt=""
                    />
                  </td>
                  <td>
                    <p>{e.productId.catagory}</p>
                  </td>
                  <td>
                    <p>₹{e.productId.price}</p>
                  </td>
                  <td>
                    <div className="d-flex align-items-center">
                      <Button
                        variant="outline-primary"
                        className="me-2"
                        onClick={() => changeData(e._id, -1)}
                        disabled={e.qnty <= 1}
                      >
                        -
                      </Button>
                      <span>{e.qnty}</span>
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
                    <Button variant="danger" onClick={() => dlt(e._id)}>
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div className="d-flex justify-content-between">
            <p className="text-center">Total: ₹ {total.current}</p>
            <Link to={"/checkout"}>
              <Button variant="primary">Checkout</Button>
            </Link>
          </div>
        </>
      ) : (
        <EmptycartPage />
      )}
    </Container>
  </div>
  );
};
