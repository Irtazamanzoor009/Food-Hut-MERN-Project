const express = require("express");
const router = express.Router();
const user = require("../models/user.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/createuser", async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const securePassword = await bcrypt.hash(req.body.password, salt);

  try {
    let existingUser = await user.findOne({ email: req.body.email });
    console.log("Existing User is: ", existingUser);
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, error: "Email already exists" });
    }
    console.log("creating");
    await user.create({
      username: req.body.username,
      password: securePassword,
      location: req.body.location,
      email: req.body.email,
      status: true, //means active
    });
    res.json({ success: true });
  } catch (error) {
    console.log("error in using schema", error);
    res.json({ success: false, error: error });
  }
});

router.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    let userData = await user.findOne({ email });

    // console.log(userData);
    if (!userData) {
      return res.status(400).json({ success: false, error: "User Not Found" });
    }

    const isMatch = await bcrypt.compare(password, userData.password);

    
    if (!isMatch) {
      return res
      .status(400)
      .json({ success: false, error: "Invalid Credentials" });
    }

    if(isMatch && userData.status === "false")
    {
      return res.status(400).json({success:false, error: "You have been blocked by the Admin. Contact the Admin"})
    }

    const data = {
      user: {
        id: userData.id,
      },
    };

    const authToken = jwt.sign(data, "thisisthestringforauthenticationpurpose");

    return res.json({ success: true, authToken: authToken, error: "None" });
  } catch (error) {
    console.log(error);
    res.json({ success: false });
  }
});

router.get("/getuser", async (req, res) => {
  try {
    const users = await user.find();

    res.send(users);
  } catch (error) {
    res.json(error);
    console.log("Internal Server Error", error);
  }
});

router.put("/updateuserstatus/:id", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    await user.findByIdAndUpdate(id, { status: status });
    res.status(200).send({ message: "User status updated successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;
