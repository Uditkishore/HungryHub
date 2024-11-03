import React, { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Cart } from "../Components/CartPage/Cartpage";
import { Headers } from "../Navbar/Navbar";
import { Homepage } from "../Components/Home/Landingpage";
import { Footer } from "../Components/Footer/Footer";
import { Productpage } from "../Components/ProductDetail/ProductDetail";
import { Checkout } from "../Components/Checkout/Checkout";
import Signup from "../Components/Signup/Signup";
import LoginPage from "../Components/Login/Login";
import Confirmation from "../Components/Confirmation/Confermation";
import NotFound from "../Components/notFound";
import { useDispatch, useSelector } from "react-redux";
import AdminPage from "../Components/addProduct";
import axios from "axios";
import { fetchData } from "../Redux/Products/action";
import { fetchCartData } from "../Redux/Cart/action";
import LandingPage from "../Components/LandingPage/landingPage";
import ScrollToTop from "../scrollToTop";

export const Router = () => {

  const token = useSelector((state) => state.token.token);
  const [isAdmin, setAdmin] = useState(false);

  const dispatch = useDispatch();

  const getUserDetails = async (token) => {
    console.log("token", token)
    try {
      const { data } = await axios.get(`${process.env.BASEURL}/user/getUser`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })

      console.log("data", data)

      if (data.status && data.data.roles === 'admin') setAdmin(true)
      dispatch(fetchCartData(token))
    } catch (error) {
      console.log("error", error);
    }
  }

  useEffect(() => {
    dispatch(fetchData());
    if (token) {
      getUserDetails(token)
    }
  }, [token]);

  return (
    <>
      <Headers isAdmin={isAdmin} />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/product" element={<Homepage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        {isAdmin && <Route path="/admin" element={<AdminPage />} />}
        <Route path="/confirm" element={<Confirmation />} />
        <Route path="/product/:id" element={<Productpage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
};
