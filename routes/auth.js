const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/users");
const bcrypt = require("bcrypt");

router.post("/signin", (req, res) => {
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

module.exports = router;
