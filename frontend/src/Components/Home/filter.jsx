import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./LandingPage.css";

const Filter = ({ filterProducts }) => {
  const getFilter = (e) => {
    const { value } = e.target;
    filterProducts(value);
  };

  return (
    <div>
      <select className="form-select" onChange={getFilter}>
        <option value="">Filter By Category...</option>
        <option value="veg">Veg</option>
        <option value="non-veg">Non-Veg</option>
      </select>
    </div>
  );
};

export default Filter;
