const express = require("express");
const router = express.Router();
const category = require("../models/foodCategorymodel");
const foodItem = require("../models/foodItemsmodel");

router.get("/getfood", async (req, res) => {
  try {
    const item = await foodItem.find();
    const cat = await category.find();
    res.send([item, cat]);
  } catch (error) {
    res.json({ success: false });
    console.log("Error is: ", error);
  }
});

router.post("/addCategory", async (req, res) => {
  const categoryName = req.body.CategoryName;
  const option = req.body.options;
  try {
    const GetCategory = await category.findOne({ CategoryName: categoryName });
    if (GetCategory) {
      return res
        .status(400)
        .json({ success: false, error: "Category Already Exists" });
    }

    await category.create({
      CategoryName: categoryName,
      options: option,
    });
    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.send("Server Error");
  }
});

router.post("/addItem", async (req, res) => {
  const catname = req.body.CategoryName;
  const itemname = req.body.ItemName;
  const url = req.body.imgURL;
  const options = req.body.options;
  const desc = req.body.description;

  try {
    console.log(itemname)
    const FoodItem = await foodItem.findOne({ name: itemname });
    if (FoodItem) {
      return res
        .status(400)
        .json({ success: false, error: "Category Already Exists" });
    }

    await foodItem.create({
      CategoryName: catname,
      name: itemname,
      img: url, 
      options: options,
      description: desc,
      status: true
    });
    res.json({ success: true });
  } catch (error) {
    console.log("Error: ", error);
  }
});

router.get("/getCatOptions/:catName", async (req, res) => {
  const categoryName = req.params.catName;
  try {
    const data = await category.findOne({ CategoryName: categoryName });
    if (data) {
      return res.status(200).json({ success: true, options: data.options });
    }
    return res.status(500).json({ success: false });
  } catch (error) {
    console.log(error);
  }
});

router.put("/updateFoodItemStauts/:id", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    await foodItem.findByIdAndUpdate(id, { status: status });
    res.status(200).send({ message: "Food status updated successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.put("/updateFoodItem/:id", async(req,res)=>{
  const {id} = req.params
  const itemname = req.body.ItemName;
  const url = req.body.imgURL;
  const options = req.body.options;
  const desc = req.body.description;

  try
  {
    await foodItem.findByIdAndUpdate(id, {name: itemname, img: url, options: options, description: desc})
    res.status(200).send({message: "Food Item Updated Successfullty"})
  }
  catch(error){
    res.status(500).send({message:"Internal Server Error"})
  }
})

module.exports = router;
