const express = require("express");
const mongoose = require("mongoose");
const app = express();
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");

// MY ROUTES
app.use(express.json());

app.use(authRoute);
app.use(postRoute);

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

// Middlewares

app.listen(8000, () => {
  console.log("Server is running on: http://localhost:8000");
});
