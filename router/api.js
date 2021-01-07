const log = { info: console.log };
const db = require("../db");
const express = require("express");
const router = express.Router();
const { Octokit } = require("@octokit/rest");
const { body, validationResult } = require("express-validator");

const octokit = new Octokit({
  auth: process.env.GITHUB_ACCESS_CODE,
  userAgent: db.githubApi.userAgent,
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
    .custom((val) => db.addCollaborator.repos.includes(val)),
  body("username").exists(),
  body("secret")
    .exists()
    .custom((val) => val === db.addCollaborator.secret),
  validateMiddleware,
  async (req, res) => {
    try {
      await octokit.repos.addCollaborator({
        owner: db.addCollaborator.owner,
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
