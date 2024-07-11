const express = require("express");
const { findOne } = require("../models/orders.js");
const router = express.Router();
const orderscart = require("../models/orders.js");

router.post("/ordercart", async (req, res) => {
  let data = req.body.order_data;
  await data.splice(0,0,{order_date:req.body.order_date})
  let emailId = await orderscart.findOne({ email: req.body.email });
  if (emailId === null) {
    try {
      await orderscart
        .create({
          email: req.body.email,
          order_data: data,
        })
        .then(() => {
          res.json({ success: true });
        });
    } catch (error) {
      console.log(error);
      res.json({success:false})
    }
  } else {
    try {
      await orderscart
        .findOneAndUpdate(
          { email: req.body.email },
          {
            $push: { order_data: data },
          }
        )
        .then(() => {
          res.json({ success: true });
        });
    } catch (error) {
      res.send(error);
      res.json({success:false})
    }
  }
});

module.exports = router;

