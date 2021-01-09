/**
 * Using require, so when data changes the server must be reloaded.
 */
module.exports = require("./storage/" +
  (process.env.NODE_ENV === "test" ? "data.test.json" : "data.json"));
