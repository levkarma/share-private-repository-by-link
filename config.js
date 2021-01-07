// some of these properties are better suited to store in database
// instead of config, but leaving here for simplicity
const config = {
  production: {
    githubApi: {
      userAgent: "",
    },
    addCollaborator: {
      owner: "", // your Github account
      repos: ["", ""], // owner's repositories that you want to add collaborators to
      secret: "",
    },
  },
  test: {
    githubApi: {
      userAgent: "Test User Agent",
    },
    addCollaborator: {
      owner: "test-owner",
      repos: ["test-repo-one"],
      secret: "example-secret",
    },
  },
};
module.exports = config[process.env.NODE_ENV || "production"];
