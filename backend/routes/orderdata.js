const express = require("express");
const { findOne } = require("../models/orders.js");
const router = express.Router();
const orderscart = require("../models/orders.js");

router.post("/ordercart", async (req, res) => {
  let data = req.body.order_data;
  await data.splice(0, 0, { order_date: req.body.order_date });
  let emailId = await orderscart.findOne({ email: req.body.email });
  if (emailId === null) {
    try {
      await orderscart
        .create({
          email: req.body.email,
          order_data: [data],
        })
        .then(() => {
          res.json({ success: true });
        });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
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
      res.json({ success: false });
    }
  }
});

router.post("/myordercart", async (req, res) => {
  let mydata = await orderscart.findOne({ email: req.body.email });
  try {
    res.json({ orderdata: mydata });
  } catch (error) {
    res.send(error);
  }
});

router.delete("/clearallrecords", async (req, res) => {
  const { email } = req.body;
  try {
    const result = await orderscart.updateOne(
      { email },
      { $set: { order_data: [] } }
    );
    if (result.nModified > 0 || result.modifiedCount > 0) {
      res.status(200).send({ message: "All orders removed successfully" });
    } else if (result.matchedCount === 0) {
      res.status(404).send({ message: "No orders found for this user" });
    } else {
      res.status(200).send({ message: "No orders were removed" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;
