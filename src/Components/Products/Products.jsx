import React from "react";
import Cards from "./Cards";
import "./products.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Products = () => {
  const [foodCategory, setfoodCategory] = useState([]);
  const [foodItem, setfoodItem] = useState([]);
  const searchvalue = useSelector((state) => state.search.value);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    LoadData();
  }, []);

  const LoadData = async (data) => {
    const response = await fetch("http://localhost:3001/addfood/getfood", {
      method: "GET",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    const json = await response.json();
    setfoodItem(json[0]);
    setfoodCategory(json[1]);
  };

  const handleSetCategory = (e) => {
    setSelectedCategory(e.target.value);
    // console.log("Category is: ", e.target.value);
  };

  return (
    <>
      <div className="upper">
        <h1>Categories:</h1>
        <div className="categorised">
          <select onChange={(e) => handleSetCategory(e)}>
            <option value="All">All</option>
            {foodCategory.length > 0 &&
              foodCategory.map((category) => {
                return (
                  <>
                    <option
                      value={category.CategoryName}
                      key={category.CategoryName}
                    >
                      {category.CategoryName}
                    </option>
                  </>
                );
              })}
          </select>
        </div>
      </div>
      <div className="main-products">
        {foodCategory.length > 0 &&
          (selectedCategory === "All"
            ? foodCategory.map((Cat) => {
                return (
                  <div key={Cat.id}>
                    <h1>{Cat.CategoryName}</h1>
                    <hr className="mainline" />
                    <div className="container">
                      <div className="row">
                        {
                          // {foodItem.length > 0 &&
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
                            })
                        }
                      </div>
                    </div>
                  </div>
                );
              })
            : foodCategory
                .filter(
                  (item) =>
                    item.CategoryName === selectedCategory
                )
                .map((FilteredCategory) => {
                  return (
                    <div key={FilteredCategory.id}>
                      <h1>{FilteredCategory.CategoryName}</h1>
                      <hr className="mainline" />
                      <div className="container">
                        <div className="row">
                          {
                            // {foodItem.length > 0 &&
                            foodItem
                              .filter(
                                (item) =>
                                  item.CategoryName === FilteredCategory.CategoryName &&
                                  item.name
                                    .toLowerCase()
                                    .includes(searchvalue.toLowerCase())
                              )
                              .map((filteredCategoryItem) => {
                                return (
                                  <div key={filteredCategoryItem.id}>
                          
                                    <Cards items={filteredCategoryItem} />
                                  </div>
                                );
                              })
                          }
                        </div>
                      </div>
                    </div>
                  );
                }))}
      </div>
    </>
  );
};

export default Products;
