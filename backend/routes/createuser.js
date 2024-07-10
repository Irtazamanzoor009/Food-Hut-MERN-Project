const express = require("express");
const router = express.Router();
const user = require("../models/user.js");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/createuser", async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const securePassword = await bcrypt.hash(req.body.password, salt);

  try {
    console.log("creating");
    await user.create({
      username: req.body.username,
      password: securePassword,
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
  const password = req.body.password;
  try {
    let userData = await user.findOne({ email });

    console.log(userData);
    if (!userData) {
      return res.status(400).json({ success: false });
    }

    const isMatch = await bcrypt.compare(password, userData.password);

    if (!isMatch) {
      return res.status(400).json({ success: false });
    }

    const data = {
      user: {
        id: userData.id,
      },
    };

    const authToken = jwt.sign(data,"thisisthestringforauthenticationpurpose")

    return res.json({ success: true, authToken:authToken });
  } catch (error) {
    console.log(error);
    res.json({ success: false });
  }
});

module.exports = router;
