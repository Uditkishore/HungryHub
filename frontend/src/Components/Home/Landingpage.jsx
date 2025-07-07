import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Landingpage.css";
import {
  fetchData,
  filterBy,
  sortByPrice,
  sortByRating,
} from "../../Redux/Products/action";
import { useNavigate } from "react-router";
import { ProductCard } from "./product";
import Loading from "../loading";
import InputSelect from "./Select";

const sortingOption = [
  { value: "price ascPrice", label: "Price: Low to High" },
  { value: "price descPrice", label: "Price: High to Low" },
  { value: "rating ascRating", label: "Rating: Low to High" },
  { value: "rating descRating", label: "Rating: High to Low" },
];

const filterData = [
  { value: "all", label: "All Recipes" },
  { value: "veg", label: "Vegetarian" },
  { value: "non-veg", label: "Non-Vegetarian" },
];

export const Homepage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state) => state.ecommerceData.products);
  const isLoading = useSelector((state) => state.ecommerceData.isLoading);
  const filteredProducts = useSelector((state) => state.ecommerceData.filteredProducts);
  const [search, setSearch] = useState("");

  const handleProductFilter = (category) => {
    dispatch(filterBy(category));
  };

  const handleProductShorting = (sortProduct) => {
    const [category, order] = sortProduct.split(" ");
    if (category === "price") {
      dispatch(sortByPrice(order));
    } else if (category === "rating") {
      dispatch(sortByRating(order));
    } else {
      dispatch(fetchData());
    }
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  if (isLoading) return <Loading />;

  return (
    <div className="container py-4">
      <div className="filter-bar container mb-4 p-3 shadow-sm bg-white rounded-3">
        <div className="row g-3">
          <div className="col-12 col-md-6 col-lg-6">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="form-control search-input"
              placeholder="Search Dishes..."
            />
          </div>
          <div className="col-12 col-md-3 col-lg-3">
            <InputSelect
              options={filterData}
              inputValue={handleProductFilter}
              placeholder="Filter by Category"
            />
          </div>
          <div className="col-12 col-md-3 col-lg-3">
            <InputSelect
              options={sortingOption}
              inputValue={handleProductShorting}
              placeholder="Sort by"
            />
          </div>
        </div>
      </div>


      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
        {(filteredProducts.length ? filteredProducts : products)
          .filter((product) =>
            product.name.toLowerCase().includes(search.toLowerCase())
          )
          .map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onClick={() => handleProductClick(product._id)}
            />
          ))}
      </div>
    </div>
  );
};
