const express = require("express");
const router = express.Router();
const category = require("../models/foodCategorymodel");
const foodItem = require("../models/foodItemsmodel")

router.get("/getfood",async(req,res)=>{
    try{
      const item = await foodItem.find();
      const cat = await category.find();
      res.send([item,cat]);
    }
    catch(error)
    { 
      res.json({ success: false });
      console.log("Error is: ", error)
    }
  })

router.post("/addCategory", async (req, res) => {
  const categoryName = req.body.CategoryName;
  const option = req.body.options;
  try {
    const GetCategory = category.findOne({ categoryName });
    if (!GetCategory) {
      return res
        .status(400)
        .json({ success: false, error: "Category Already Exists" });
    }

    await category.create({
      CategoryName: categoryName,
      options: option,
    });
    res.json({success:true})
  } catch (error) {
    console.log(error);
    res.send("Server Error");
  }
});

module.exports = router;
