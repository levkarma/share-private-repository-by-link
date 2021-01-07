module.exports = require("./storage/" +
  (process.env.NODE_ENV === "test" ? "data.test.json" : "data.json"));
