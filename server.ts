const express = require("express");
const app = express();
const mongoose = require("mongoose");

app.get("/", (req, res) => {
  res.send("Connected with Express , Rest API ");
});
app.listen(3000, () => console.log("Server Started"));
