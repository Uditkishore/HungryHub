import React, { useEffect, useState, useRef } from "react";
import { Table, Button, Container, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { fetchCartData } from "../../Redux/Cart/action";

export const Cart = () => {
  const { cart, isLoading } = useSelector((store) => store.cartData);
  const dispatch = useDispatch();
  let total = useRef(0);

  const [cartData, setCartData] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    dispatch(fetchCartData());
  }, [cartData]);

  const sum = () => {
    let s = 0;
    for (let i = 0; i < cart.length; i++) {
      s += cart[i].price * cart[i].qnty;
    }
    total.current = s;
    localStorage.setItem("total", JSON.stringify(total.current));
  };
  sum();

  const dlt = (payload) => {
    setCartData(payload);
    dispatch(deleteCartData(payload));
    dispatch(fetchCartData());
  };

  const changeData = (id, val) => {
    let temp = cart.filter((e) => e._id === id);

    if (temp[0].qnty >= 1) {
      temp[0].qnty += val;
      let payload = { ids: id, qnty: temp[0] };

      axios
        .patch(
          `https://fakeshopapi.herokuapp.com/cart/${payload.ids}`,
          payload.qnty
        )
        .then((res) => {
          dispatch(fetchCartData());
        })
        .catch((error) => {
          setError(error.response.data.message);
        });
    }
    if (temp[0].qnty < 1) {
      dlt(id);
    }
    setCartData(id);
  };

  return (
    <div className="card_details" style={{ padding: 20, minHeight: "100vh" }}>
      <Container fluid>
        <h2 className="mb-4">Your Cart</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        {cart && cart.length ? (
          <>
            <Table responsive>
              <thead>
                <tr>
                  <th>Photo</th>
                  <th>Restaurant Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((e) => (
                  <tr key={e.id}>
                    <td>
                      <img
                        src={e.imgdata}
                        style={{ width: "100px", height: "100px" }}
                        alt=""
                      />
                    </td>
                    <td>
                      <p>{e.rname}</p>
                    </td>
                    <td>
                      <p>₹{e.price}</p>
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
          <div
            className="d-flex justify-content-center align-items-center flex-column"
            style={{ height: "100%" }}
          >
            {isLoading ? (
              <div
                id="loader"
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                <div className="spinner-border" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            ) : (
              <p style={{ fontSize: 22 }}>Your cart is empty</p>
            )}
          </div>
        )}
      </Container>
    </div>
  );
};
