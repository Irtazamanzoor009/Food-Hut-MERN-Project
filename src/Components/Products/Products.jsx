import React from "react";
import Cards from "./Cards";
import "./products.css";

const Products = () => {
  return (
    <div className="main-products">
      <h1>Starter</h1>
      <hr className="mainline" />
      <div className="container">
        <div className="row">
          <Cards />
          <Cards />
          <Cards />
          <Cards />
        </div>
      </div>
    </div>
  );
};

export default Products;
