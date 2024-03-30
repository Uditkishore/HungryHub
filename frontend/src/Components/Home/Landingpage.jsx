import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchData,
  filterBy,
  sortByPrice,
  sortByRating,
} from "../../Redux/Products/action";
import { useNavigate } from "react-router";
import { ProductCard } from "./product";
import Loading from "../loading";
import SortBy from "./sortBy";
import "./Landingpage.css"

const sortingOption = [
  { value: "price ascPrice", label: 'Price low' },
  { value: 'price descPrice', label: 'Price High' },
  { value: 'rating ascRating', label: 'Rating Low' },
  { value: 'rating descRating', label: 'Rating High' }
]

const filterData = [
  { value: "all", label: 'All Reciepes' },
  { value: 'veg', label: 'Veg' },
  { value: 'non-veg', label: 'Non-Veg' },
]

export const Homepage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state) => state.ecommerceData.products);
  const isLoading = useSelector((state) => state.ecommerceData.isLoading);
  const filteredProducts = useSelector((state) => state.ecommerceData.filteredProducts);
  const [search, setSearch] = useState('');

  const handleProductFilter = (category) => {
    dispatch(filterBy(category));
  };

  const handleProductShorting = (sortProduct) => {
    console.log("sortProduct", sortProduct)
    const category = sortProduct.split(" ")[0];
    const order = sortProduct.split(" ")[1];
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

  if (isLoading) return <Loading />
  return (
    <div className="container h-100 mt-3">
      <div className="row bg justify-content-between align-items-center gap-2">
        <div className="col-md-12 col-lg-5 py-2">
          <input type="email" value={search} onChange={(e) => setSearch(e.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Search Dishes" />
        </div>
        <div className="col-md-12 col-lg-3">
          <SortBy options={filterData} inputValue={handleProductFilter} placeholder={"Select Catagory..."} />
        </div>
        <div className="shortBy col-md-12 col-lg-3">
          <SortBy options={sortingOption} inputValue={handleProductShorting} placeholder={"Filter Dishes..."} />
        </div>
      </div>

      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 justify-content-center mt-3">
        {filteredProducts && filteredProducts.length > 0
          ? filteredProducts
            .filter((product) =>
              product.name.toLowerCase().includes(search.toLowerCase())
            ).map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onClick={() => handleProductClick(product._id)}
            />
          ))
          : products
            .filter((product) =>
              product.name.toLowerCase().includes(search.toLowerCase())
            )
            .map((filteredProduct) => (
              <ProductCard
                key={filteredProduct._id}
                product={filteredProduct}
                onClick={() => handleProductClick(filteredProduct._id)}
              />
            ))
        }
      </div>
    </div>
  );
};
