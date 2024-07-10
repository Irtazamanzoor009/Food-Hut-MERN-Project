const express = require("express");
const router = express.Router();

router.post("/fooditems", (req, res) => {
  try {
    res.send([global.food_items, global.food_category])
  } catch (error) {
    console.log(error);
    res.send("Server Error")
  }
});

module.exports = router;
