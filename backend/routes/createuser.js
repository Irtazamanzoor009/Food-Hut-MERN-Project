const express = require("express");
const router = express.Router();
const user = require("../models/user.js");
const { body, validationResult } = require("express-validator");

router.post("/createuser", async (req, res) => {
  try {
    console.log("creating");
    await user.create({
      username: req.body.username,
      password: req.body.password,
      location: req.body.location,
      email: req.body.email,
    });
    res.json({ success: true });
  } catch (error) {
    console.log("error in using schema", error);
    res.json({ success: false });
  }
});

router.post("/login", async (req, res) => {
  const email = req.body.email;
  try {
    let userData = await user.findOne({ email });
    console.log(userData)
    if (!userData) {
      return res.status(400).json({ success: false });
    }

    if (req.body.password !== userData.password) {
      return res.status(400).json({ success: false });
    }

    return res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.json({ success: false });
  }
});

module.exports = router;
