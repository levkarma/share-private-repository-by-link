require("dotenv").config();
const express = require("express");
const app = express();
const api = require("./router/api");
app.use(express.static("dist"));

app.use(express.json());
app.use("/api", api);
// Serve the build Vue app
app.get("/", function(req, res) {
  res.sendFile("/dist/index.html");
});
module.exports = app;
