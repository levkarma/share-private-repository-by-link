const axios = require("axios");

axios
  .post("http://localhost:3000/api/add-collaborator", {
    username: "",
    repo: "",
  })
  .then(console.log)
  .catch((e) => console.error(e.response));
