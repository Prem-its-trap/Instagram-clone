const express = require("express");
const mongoose = require("mongoose");
const app = express();
const Signin = require("./routes/auth");

app.use(express.json());
app.use(Signin);

mongoose
  .connect("mongodb://localhost:27017/instagram-clone", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DB CONNECTED");
  })
  .catch(() => {
    console.log("DB NOT CONNECTED");
  });

app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(8000, () => {
  console.log("Server is running on: http://localhost:8000");
});
