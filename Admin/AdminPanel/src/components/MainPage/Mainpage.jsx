import React, { useState } from "react";
import Navbar from "../Navbar/Navbar.jsx";
import "./mainpage.css";
import Modal from "./Modal";
import { useForm } from "react-hook-form";

const Mainpage = () => {
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [showViewItemsModal, setShowViewItemsModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [options, setOptions] = useState([]);

  const addOptionField = () => {
    setOptions([...options, ""]);
  };

  const EmptyOptionsField = () => {
    setOptions([]);
  };

  const removeOptionField = (index) => {
    setOptions(options.filter((_, i) => i !== index));
  };

  const handleOptionChange = (index, event) => {
    const newOptions = [...options];
    newOptions[index] = event.target.value;
    setOptions(newOptions);
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

  const CategoryFormSubmit = (data) => {
    console.log(data);
  };

  const handleCloseAddCategoryModal = () => {
    setShowAddCategoryModal(false);
    setOptions([]);
  };

  return (
    <div>
      <Navbar />
      <div className="mainpage-container">
        <div className="mainpage-wraper">
          <div className="upper-btns">
            <select>
              <option value="">Pizza</option>
              <option value="">Biryani</option>
            </select>
            <button
              className="mainpage-btn"
              onClick={() => setShowAddCategoryModal(true)}
            >
              <i className="fa-solid fa-plus"></i> <p>Add New Category</p>
            </button>
          </div>
          <div className="category-box">
            <div className="mainpage-boxes">
              <div className="boxes-contents">
                <p>Category Name: Pizza</p>
                <p>Total Items: 2</p>
              </div>
              <div className="boxes-buttons">
                <button
                  className="mainpage-btn top-btn"
                  onClick={() => openAddItemModal("Pizza")}
                >
                  <i className="fa-solid fa-plus"></i> <p>Add New Item</p>
                </button>
                <button
                  className="mainpage-btn"
                  onClick={() => openViewItemsModal("Pizza")}
                >
                  <i className="fa-sharp fa-solid fa-eye"></i> <p>View Items</p>
                </button>
              </div>
            </div>
            <div className="mainpage-boxes">
              <div className="boxes-contents">
                <p>Category Name: SandWiches</p>
                <p>Total Items: 2</p>
              </div>
              <div className="boxes-buttons">
                <button
                  className="mainpage-btn top-btn"
                  onClick={() => openAddItemModal("SandWiches")}
                >
                  <i className="fa-solid fa-plus"></i> <p>Add New Item</p>
                </button>
                <button
                  className="mainpage-btn"
                  onClick={() => openViewItemsModal("SandWiches")}
                >
                  <i className="fa-sharp fa-solid fa-eye"></i> <p>View Items</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        show={showAddCategoryModal}
        onClose={handleCloseAddCategoryModal}
        title="Add New Category"
      >
        {/* Add Category Form */}
        {showSuccessMessage && (
          <div className="green msgs alerts">Category Added Successfully</div>
        )}
        {errors.categoryName && (
          <div className="red msgs">{errors.categoryName.message}</div>
        )}
        <form onSubmit={handleSubmit(CategoryFormSubmit)}>
          <label>
            <input
              type="text"
              placeholder="Enter New Category"
              {...register("categoryName", {
                required: {
                  value: true,
                  message: "Please Enter Category Name",
                },
              })}
            />
          </label>
          <div className="options-container">
            <label>Options:</label>
            {options.map((option, index) => (
              <div key={index} className="option-field">
                <input
                  type="text"
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
        show={showAddItemModal}
        onClose={() => setShowAddItemModal(false)}
        title="Add New Item"
      >
        {/* Add Item Form */}
        {showSuccessMessage && (
          <div className="green msgs alerts">Item Added Up Successfully</div>
        )}
        <form>
          <label>Category Name: {selectedCategory}</label>
          <input
            type="text"
            placeholder="Enter Name"
            {...register("name", {
              required: { value: true, message: "Please Enter Item Name" },
            })}
          />
          <input
            type="text"
            placeholder="Enter Img URL"
            {...register("img", {
              required: { value: true, message: "Please Enter Img URL" },
            })}
          />
          <input
            type="text"
            placeholder="Enter Item Desctiption"
            {...register("img", {
              required: {
                value: true,
                message: "Please Enter Item Description",
              },
            })}
          />
          <button type="submit">
            Add Item
            {isLoading && <i className="fa-solid fa-spinner fa-spin"></i>}
          </button>
        </form>
      </Modal>

      <Modal
        show={showViewItemsModal}
        onClose={() => setShowViewItemsModal(false)}
        title="View Items"
      >
        {/* View Items Content */}
        CategoryName: {selectedCategory}
        <p>List of items...</p>
      </Modal>
    </div>
  );
};

export default Mainpage;
