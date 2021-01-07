const log = { info: console.log };
const config = require("../config");
const express = require("express");
const router = express.Router();
const { Octokit } = require("@octokit/rest");
const { body, validationResult } = require("express-validator");

const octokit = new Octokit({
  auth: process.env.GITHUB_ACCESS_CODE,
  userAgent: config.githubApi.userAgent,
});

const validateMiddleware = (req, res, next) => {
  try {
    validationResult(req).throw();
    next();
  } catch (e) {
    console.log(e);
    res.status(422).send("Validation error");
  }
};

router.post(
  "/add-collaborator",
  body("repo")
    .exists()
    .custom((val) => config.addCollaborator.repos.includes(val)),
  body("username").exists(),
  body("secret")
    .exists()
    .custom((val) => val === config.addCollaborator.secret),
  validateMiddleware,
  async (req, res) => {
    try {
      await octokit.repos.addCollaborator({
        owner: config.addCollaborator.owner,
        repo: req.body.repo,
        username: req.body.username,
        permission: "pull",
      });
      res.send("Success");
    } catch (e) {
      log.info(e);
      res.status(422).send("Github API error. Check username correct.");
    }
  }
);

module.exports = router;
