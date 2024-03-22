import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./LandingPage.css";

const shortingComp = ({ sortProducts }) => {
  const getValue = (e) => {
    const { value } = e.target;
    sortProducts(value);
  };

  return (
    <div>
      <select className="form-select" onChange={getValue}>
        <option value="">Sort By Price...</option>
        <option value="price ascPrice">Price low</option>
        <option value="price descPrice">Price High</option>
        <option value="rating ascRating">Rating Low</option>
        <option value="rating descRating">Rating High</option>
      </select>
    </div>
  );
};

export default shortingComp;
