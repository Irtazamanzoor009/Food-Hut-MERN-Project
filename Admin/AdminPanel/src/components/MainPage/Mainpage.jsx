import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar.jsx";
import "./mainpage.css";
import Modal from "./Modal";
import { useForm } from "react-hook-form";

const Mainpage = () => {
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [showViewItemsModal, setShowViewItemsModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [foodCategory, setfoodCategory] = useState([]);
  const [foodItem, setfoodItem] = useState([]);
  const [selectedCategoryDropDown, setSelectedCategoryDropDown] =
    useState("All");
  const [serverError, setserverError] = useState("");

  // -------------------------- Category form submission data
  const [CategoryFormData, setCategoryFormData] = useState({
    CategoryName: "",
    options: [],
  });

  const CategoryhandleChange = (e) => {
    const { name, value } = e.target;
    setCategoryFormData({
      ...CategoryFormData,
      [name]: value,
    });
  };

  const handleOptionChange = (index, event) => {
    const newOptions = [...CategoryFormData.options];
    newOptions[index] = event.target.value;
    setCategoryFormData({
      ...CategoryFormData,
      options: newOptions,
    });
  };

  const addOptionField = () => {
    setCategoryFormData({
      ...CategoryFormData,
      options: [...CategoryFormData.options, ""],
    });
  };

  const removeOptionField = (index) => {
    const newOptions = [...CategoryFormData.options];
    newOptions.splice(index, 1);
    setCategoryFormData({
      ...CategoryFormData,
      options: newOptions,
    });
  };
  const CategoryhandleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setserverError("");
    // setShowSuccessMessage(true);
    console.log("Form data submitted:", CategoryFormData);
    try {
      const response = await fetch(
        "http://localhost:3001/addfood/addCategory",
        {
          method: "POST",
          body: JSON.stringify(CategoryFormData),
          headers: { "Content-Type": "application/json" },
        }
      );

      const result = await response.json();
      if (!result.success) {
        if (result.error === "Category Already Exists") {
          setserverError(result.error);
        } else {
          setserverError("An error occurred. Please try again.");
        }
        setIsLoading(false);
        setTimeout(() => {
          setserverError("");
        }, 1000);
        return;
      }

      setTimeout(() => {
        setIsLoading(false);
      }, 300);

      setCategoryFormData({
        CategoryName: "",
        options: [],
      });

      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
        reset();
      }, 1000);
      LoadData();
    } catch (error) {
      console.log("Internal Server error at UI", error);
    }
  };

  // _--------------------Category Fom Ended ------------------

  //  -------------------- Item Form Functions ------------------

  const [categoryOptions, setCategoryOptions] = useState([]);

  const [ItemFormData, setItemFormData] = useState({
    CategoryName: "",
    ItemName: "",
    imgURL: "",
    options: [{}],
    description: "",
  });

  const ItemhandleChange = (e) => {
    const { name, value } = e.target;
    setItemFormData({
      ...ItemFormData,
      [name]: value,
    });
  };

  const handleOptionChangeInItem = (optionType, value) => {
    const updatedOptions = { ...ItemFormData.options[0], [optionType]: value };
    setItemFormData({
      ...ItemFormData,
      options: [updatedOptions],
    });
  };

  const handleItemSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setserverError("");
    try {
      const response = await fetch("http://localhost:3001/addfood/addItem", {
        method: "POST",
        body: JSON.stringify(ItemFormData),
        headers: { "Content-Type": "application/json" },
      });

      const result = await response.json();
      if (!result.success) {
        if (result.error === "Category Already Exists") {
          setserverError(result.error);
        } else {
          setserverError("An error occurred. Please try again.");
        }
        setIsLoading(false);
        setTimeout(() => {
          setserverError("");
        }, 1000);
        return;
      }

      setTimeout(() => {
        setIsLoading(false);
      }, 300);

      setItemFormData({
        CategoryName: "",
        ItemName: "",
        imgURL: "",
        options: [{}],
        description: "",
      });

      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
        reset();
      }, 1000);
      LoadData();
    } catch (error) {
      console.log("Internal Server error at UI", error);
    }
  };

  useEffect(() => {
    if (selectedCategory) {
      GetOptionsOfCategory(selectedCategory);
    }
  }, [selectedCategory]);

  const GetOptionsOfCategory = async (categoryName) => {
    try {
      const response = await fetch(
        `http://localhost:3001/addfood/getCatOptions/${categoryName}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          // body: JSON.stringify({ status: newStatus }),
        }
      );

      const result = await response.json();
      setCategoryOptions(result.options);
      setItemFormData((data) => ({
        ...data,
        CategoryName: categoryName,
      }));
      // console.log(result.options)
    } catch {
      console.log("Internal Server Error at UI");
    }
  };

  const openAddItemModal = (category) => {
    setSelectedCategory(category);
    setShowAddItemModal(true);
  };

  const openViewItemsModal = (category) => {
    setSelectedCategory(category);
    setShowViewItemsModal(true);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  // const CategoryFormSubmit = async (data) => {
  //   console.log("helel");
  //   setIsLoading(true);
  //   setShowSuccessMessage(true);
  //   setTimeout(() => {
  //     setIsLoading(false);
  //     setShowSuccessMessage(false);
  //   }, 1000);
  //   console.log(data);
  // };

  const handleCloseAddCategoryModal = () => {
    setShowAddCategoryModal(false);
    setCategoryFormData({
      CategoryName: "",
      options: [],
    });
  };

  const handleCloseAddItemModel = () => {
    setShowAddItemModal(false);
    setItemFormData({
      CategoryName: "",
      ItemName: "",
      imgURL: "",
      options: [{}],
      description: "",
    });
  };

  const LoadData = async (data) => {
    try {
      const response = await fetch("http://localhost:3001/addfood/getfood", {
        method: "GET",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
      const json = await response.json();

      setfoodItem(json[0]);
      setfoodCategory(json[1]);
    } catch {
      console.log("Internal Server Error at UI");
    }
  };

  useEffect(() => {
    setfoodItem([]);
    setfoodCategory([]);
    LoadData();
  }, []);

  const handleSetCategory = (e) => {
    setSelectedCategoryDropDown(e.target.value);
    console.log("Category is: ", e.target.value);
  };

  const getCountByCategory = (categoryName) => {
    return foodItem.filter((item) => item.CategoryName === categoryName).length;
  };

  return (
    <div>
      <Navbar />
      <div className="mainpage-container">
        <div className="mainpage-wraper">
          <div className="upper-btns">
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
            <button
              className="mainpage-btn"
              onClick={() => setShowAddCategoryModal(true)}
            >
              <i className="fa-solid fa-plus"></i> <p>Add New Category</p>
            </button>
          </div>
          <div className="category-box">
            {foodCategory.length > 0 &&
              (selectedCategoryDropDown === "All"
                ? foodCategory.map((item) => {
                    return (
                      <div key={item._id} className="mainpage-boxes">
                        <div className="boxes-contents">
                          <p>Category Name: {item.CategoryName}</p>

                          <p>
                            Total Items: {getCountByCategory(item.CategoryName)}
                          </p>
                        </div>
                        <div className="boxes-buttons">
                          <button
                            className="mainpage-btn top-btn"
                            onClick={() => openAddItemModal(item.CategoryName)}
                          >
                            <i className="fa-solid fa-plus"></i>{" "}
                            <p>Add New Item</p>
                          </button>
                          <button
                            className="mainpage-btn"
                            onClick={() =>
                              openViewItemsModal(item.CategoryName)
                            }
                          >
                            <i className="fa-sharp fa-solid fa-eye"></i>{" "}
                            <p>View Items</p>
                          </button>
                        </div>
                      </div>
                    );
                  })
                : foodCategory
                    .filter(
                      (filteritem) =>
                        filteritem.CategoryName === selectedCategoryDropDown
                    )
                    .map((selectedcat) => {
                      return (
                        <div key={selectedcat._id} className="mainpage-boxes">
                          <div className="boxes-contents">
                            <p>Category Name: {selectedcat.CategoryName}</p>
                            <p>
                              Total Items:{" "}
                              {getCountByCategory(selectedcat.CategoryName)}
                            </p>
                          </div>
                          <div className="boxes-buttons">
                            <button
                              className="mainpage-btn top-btn"
                              onClick={() =>
                                openAddItemModal(selectedcat.CategoryName)
                              }
                            >
                              <i className="fa-solid fa-plus"></i>{" "}
                              <p>Add New Item</p>
                            </button>
                            <button
                              className="mainpage-btn"
                              onClick={() =>
                                openViewItemsModal(selectedcat.CategoryName)
                              }
                            >
                              <i className="fa-sharp fa-solid fa-eye"></i>{" "}
                              <p>View Items</p>
                            </button>
                          </div>
                        </div>
                      );
                    }))}
          </div>
        </div>
      </div>

      <Modal
        isitems={false}
        show={showAddCategoryModal}
        onClose={handleCloseAddCategoryModal}
        title="Add New Category"
      >
        {/* Add Category Form */}
        {showSuccessMessage && (
          <div className="green msgs alerts">Category Added Successfully</div>
        )}
        {serverError && <div className="red msgs alerts">{serverError}</div>}
        <form onSubmit={CategoryhandleSubmit}>
          <input
            type="text"
            placeholder="Enter New Category"
            name="CategoryName"
            value={CategoryFormData.CategoryName}
            onChange={CategoryhandleChange}
            required
          />

          <div className="options-container">
            <label>Options:</label>
            {CategoryFormData.options.map((option, index) => (
              <div key={index} className="option-field">
                <input
                  type="text"
                  name={`option-${index}`}
                  value={option}
                  onChange={(event) => handleOptionChange(index, event)}
                  placeholder={`Option ${index + 1}`}
                />
                <button type="button" onClick={() => removeOptionField(index)}>
                  Remove
                </button>
              </div>
            ))}
            <button type="button" onClick={addOptionField}>
              Add Option
            </button>
          </div>
          <button type="submit">
            Add Category
            {isLoading && <i className="fa-solid fa-spinner fa-spin"></i>}
          </button>
        </form>
      </Modal>

      <Modal
        isitems={false}
        show={showAddItemModal}
        onClose={handleCloseAddItemModel}
        title="Add New Item"
      >
        {/* Add Item Form */}
        {showSuccessMessage && (
          <div className="green msgs alerts">Item Added Up Successfully</div>
        )}
        {serverError && <div className="red msgs alerts">{serverError}</div>}

        <form onSubmit={handleItemSubmit}>
          <label>Category Name: {selectedCategory}</label>
          <input
            type="text"
            placeholder="Enter Name"
            name="ItemName"
            value={ItemFormData.ItemName}
            onChange={ItemhandleChange}
            required
          />
          <input
            type="text"
            placeholder="Enter Img URL"
            name="imgURL"
            value={ItemFormData.imgURL}
            onChange={ItemhandleChange}
            required
          />
          {categoryOptions.map((option, index) => (
            <div key={index}>
              <label>{option}</label>
              <input
                type="text"
                placeholder={`Enter ${option} price`}
                value={ItemFormData.options[0][option] || ""}
                onChange={(e) =>
                  handleOptionChangeInItem(option, e.target.value)
                }
                required
              />
            </div>
          ))}
          <input
            type="text"
            placeholder="Enter Item Desctiption"
            name="description"
            value={ItemFormData.description}
            onChange={ItemhandleChange}
            required
          />
          <button type="submit">
            Add Item
            {isLoading && <i className="fa-solid fa-spinner fa-spin"></i>}
          </button>
        </form>
      </Modal>

      <Modal
        isitems={true}
        show={showViewItemsModal}
        onClose={() => setShowViewItemsModal(false)}
        title="View Items"
      >
        <h3>CategoryName: {selectedCategory}</h3>

        <div>
          <div className="users-container view-items-container">
            <div className="mainpage-cart-items">
              <div className="table-contents">
                <table>
                  <thead>
                    <tr>
                      <th className="mainpage-Image">Image</th>
                      <th className="mainpage-Name">Name</th>
                      <th className="mainpage-options">Options</th>
                      <th className="mainpage-status">Status</th>
                      <th className="mainpage-update">Update</th>
                      <th className="mainpage-extra"></th>
                    </tr>
                  </thead>
                </table>
              </div>
              <div className="mainpage-body-content">
                <table>
                  <tbody>
                    {foodItem
                      .filter((item) => item.CategoryName === selectedCategory)
                      .map((filteredFoodItem) => {
                        return (
                          <tr key={filteredFoodItem._id} className="last-row">
                            <td className="mainpage-Image">
                              <img
                                src={filteredFoodItem.img}
                                alt={filteredFoodItem.name}
                              />
                            </td>
                            <td className="mainpage-Name">
                              {filteredFoodItem.name}
                            </td>
                            <td className="mainpage-options">
                              {filteredFoodItem.options.map((option, index) => (
                                <div key={index}>
                                  {Object.keys(option).map((key) => (
                                    <div key={key}>
                                      {key}: {option[key]}
                                    </div>
                                  ))}
                                </div>
                              ))}
                            </td>
                            <td className="mainpage-status">
                              <button>In Active</button>
                            </td>
                            <td className="mainpage-update">
                              <button>Update</button>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Mainpage;
