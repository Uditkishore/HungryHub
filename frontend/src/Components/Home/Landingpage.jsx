import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchData,
  filterBy,
  sortByPrice,
  sortByRating,
} from "../../Redux/Products/action";
import { useNavigate } from "react-router";
import ShortingComp from "./shortingComp";
import Filter from "./filter";
import { ProductCard } from "./product";
import Loading from "../loading";
import { fetchCartData } from "../../Redux/Cart/action";

export const Homepage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state) => state.ecommerceData.products);
  const isLoading = useSelector((state) => state.ecommerceData.isLoading);
  const filteredProducts = useSelector(
    (state) => state.ecommerceData.filteredProducts
  );

  const handleProductFilter = (category) => {
    dispatch(filterBy(category));
  };

  const handleProductShorting = (sortProduct) => {
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

  if (isLoading) return <Loading/>
  return (
    <div className="container h-100 mt-3">
      <div className="row bg justify-content-between gap-2">
        <div className="col-md-6 col-lg-4">
          <Filter filterProducts={handleProductFilter} />
        </div>
        <div className="col-md-6 col-lg-4">
          <ShortingComp sortProducts={handleProductShorting} />
        </div>
      </div>

      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 justify-content-center mt-3">
        {filteredProducts && filteredProducts.length > 0
          ? filteredProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onClick={() => handleProductClick(product._id)}
              />
            ))
          : products.map((product) => (
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
