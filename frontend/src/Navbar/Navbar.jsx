import React, { useState } from "react";
import Badge from "@mui/material/Badge";
import { Nav, Navbar, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../Redux/Auth/action";

export const Headers = (props) => {
  const [expanded, setExpanded] = useState(false); // State to control navbar collapse
  const cartData = useSelector((e) => e.cartData);
  const { token } = useSelector((state) => state.token);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutBtn = (e) => {
    dispatch(clearUser(""));
    navigate("/");
    window.location.reload();
  };

  return (
    <>
      <Navbar expand="lg" bg="dark" variant="dark" expanded={expanded}> {/* Control navbar collapse using expanded state */}
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
          <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setExpanded(!expanded)} /> {/* Toggle navbar collapse */}
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto px-5 gap-2 align-items-center">
              <Nav.Link className="mx-3 pointer" onClick={() => { navigate("/"); setExpanded(false); }}>Home</Nav.Link> {/* Close navbar on selection */}
              {props.isAdmin && <Nav.Link className="mx-3 pointer" onClick={() => { navigate("/admin"); setExpanded(false); }}>Add Product</Nav.Link>}
              {token ? (
                <>
                  <Nav.Link className="mx-3 pointer" onClick={logoutBtn}>
                    Logout
                  </Nav.Link>
                  <Badge
                    id="basic-button"
                    aria-haspopup="true"
                    onClick={() => { navigate("/cart"); setExpanded(false); }}
                    badgeContent={cartData.cart.length}
                    color="primary"
                    overlap="circular"
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    className="m-3 m-sm-0 cart-icon cursor-pointer"
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
                    onClick={() => { navigate("/login"); setExpanded(false); }}
                  >
                    Login
                  </Nav.Link>
                  <Nav.Link
                    className="mx-3 pointer"
                    onClick={() => { navigate("/signup"); setExpanded(false); }}
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
