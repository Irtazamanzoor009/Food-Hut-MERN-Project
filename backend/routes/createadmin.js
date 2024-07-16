const express = require("express");
const router = express.Router();
const admin = require("../models/admin.js");
const jwt = require("jsonwebtoken");

router.post("/adminlogin", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    try {
        console.log("Email is:", email)
      let userData = await admin.findOne({ email });
  
      if (!userData) {
        return res.status(400).json({ success: false, error:"UserData Not found" });
      }
  
  
      if ((userData.password !== password)) {
        return res.status(400).json({ success: false, error: "Password not match" });
      }
  
      const data = {
        admin: {
          id: userData.id,
        },
      };
  
      const authToken = jwt.sign(data,"thisisthestringforauthenticationpurpose")
  
      return res.json({ success: true, authToken:authToken });
    } catch (error) {
      console.log(error);
      res.json({ success: false, error:"connection error" });
    }
  });

module.exports = router;
