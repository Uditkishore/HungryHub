import React from "react";
import Badge from "@mui/material/Badge";
import { Nav, Navbar, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../Redux/Auth/action";

export const Headers = () => {
  const cartData = useSelector((e) => e.cartData);
  const { token } = useSelector((state) => state.token);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutBtn = (e) => {
    dispatch(clearUser(""));
    navigate("/");
  };

  return (
    <>
      <Navbar expand="lg" bg="dark" variant="dark">
        <Container fluid>
          <Navbar.Brand>
            <div className="d-flex align-items-center">
              <img
                width={"30px"}
                src=""
                alt=""
                className="me-2"
              />
              <span className="logo-text">Zaika</span>
            </div>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto px-5 gap-2 align-items-center">
              <Nav.Link className="mx-3 pointer" onClick={() => navigate("/")}>Home</Nav.Link>
              {token ? (
                <>
                  <Nav.Link className="mx-3 pointer" onClick={logoutBtn}>
                    Logout
                  </Nav.Link>
                  <Badge
                    id="basic-button"
                    aria-haspopup="true"
                    onClick={() => navigate("/cart")}
                    badgeContent={cartData.cart.length}
                    color="primary"
                    overlap="circular"
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    className="cart-icon coursor-pointer"
                  >
                    <i
                      className="fa-solid fa-cart-shopping text-light"
                      style={{ fontSize: 20, cursor: "pointer" }}
                    ></i>
                  </Badge>
                </>
              ) : (
                <>
                  <Nav.Link
                    className="mx-3 pointer"
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </Nav.Link>
                  <Nav.Link
                    className="mx-3 pointer"
                    onClick={() => navigate("/signup")}
                  >
                    Signup
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
