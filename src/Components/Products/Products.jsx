import React from "react";
import Cards from "./Cards";
import "./products.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Products = () => {
  const [foodCategory, setfoodCategory] = useState([]);
  const [foodItem, setfoodItem] = useState([]);
  const searchvalue = useSelector((state) => state.search.value);

  useEffect(() => {
    LoadData();
  }, []);

  const LoadData = async (data) => {
    const response = await fetch("http://localhost:3001/food/fooditems", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    const json = await response.json();
    setfoodItem(json[0]);
    setfoodCategory(json[1]);
  };

  return (
    <div className="main-products">
      {foodCategory.length > 0 &&
        foodCategory.map((Cat) => {
          return (
            <div key={Cat.id}>
              <h1>{Cat.CategoryName}</h1>
              <hr className="mainline" />
              <div className="container">
                <div className="row">
                  {foodItem.length > 0 &&
                    foodItem
                      .filter(
                        (item) =>
                          item.CategoryName === Cat.CategoryName &&
                          item.name
                            .toLowerCase()
                            .includes(searchvalue.toLowerCase())
                      )
                      .map((filteredItem) => {
                        return (
                          <div key={filteredItem.id}>
                            <Cards items={filteredItem} />
                          </div>
                        );
                      })}
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Products;
