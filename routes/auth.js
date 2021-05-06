const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../keys");
const requiredLogin = require("../middleware/requiredLogin");

router.post("/signup", (req, res) => {
  const { name, email, password } = req.body; // destructure
  if (!email || !password || !name) {
    res.status(422).json({
      error: "please add all the fields",
    });
  }
  User.findOne({ email: email })
    .then((savedUser) => {
      if (savedUser) {
        return res.status(422).json({ error: "Email already exists" });
      }
      bcrypt.hash(password, 10).then((hashedPassword) => {
        const user = new User({
          email,
          password: hashedPassword,
          name,
        });
        user
          .save()
          .then((user) => {
            console.log(user);
            res.json({ message: "User Saved" });
          })
          .catch((err) => {
            console.log(err);
          });
      });
    })
    .catch((err) => {
      console.log(err);
    });

  //
});

router.post("/signin", (req, res) => {
  // console.log(req.headers);
  // console.log(ContentType);
  const { email, password } = req.body;
  console.log(email);
  if (!email || !password) {
    res.status(422).json({
      error: "Please add email and password",
    });
  }

  User.findOne({ email: email }).then((savedUser) => {
    if (!savedUser) {
      return res.status(422).json({
        error: "Invalid Email and password",
      });
    }
    bcrypt
      .compare(password, savedUser.password)
      .then((doMatch) => {
        if (doMatch) {
          // res.json({
          //   message: "Signed in success",
          // });
          const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET);
          res.json({ token });
        } else {
          return res.json({
            error: "Invalid Email and password",
          });
        }
      })
      .catch((e) => {
        console.log(e);
      });
  });
});

module.exports = router;
