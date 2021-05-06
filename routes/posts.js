const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requiredLogin = require("../middleware/requiredLogin");
const Post = require("../models/posts");

router.get("/allposts", (req, res) => {
  Post.find()
    .populate("postedBy", "_id name")
    .then((posts) => {
      res.json({ posts: posts });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/createPost", requiredLogin, (req, res) => {
  const { title, body } = req.body;
  //   console.log(req.body);
  if (!title || !body) {
    return res.send(422).json({
      error: "Please add all the fields",
    });
  }
  req.user.password = undefined;
  const post = new Post({
    title,
    body,
    postedBy: req.user,
  });
  post
    .save()
    .then((result) => {
      res.json({
        post: result,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/mypost", requiredLogin, (req, res) => {
  Post.find({ postedBy: req.user._id })
    .populate("postedBy", "name")
    .then((mypost) => {
      res.json({ mypost });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
