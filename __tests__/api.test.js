// silence logging
console.log = jest.fn();

const request = require("supertest");
const app = require("../server");
const { Octokit } = require("@octokit/rest");

describe("router/api", () => {
  describe("/add-collaborator", () => {
    it("should respond with 200 when adding collaborator through API succeeds", async () => {
      new Octokit().repos.__setAddCollaboratorFn(() => {
        // no error
      });
      const res = await request(app)
        .post("/api/add-collaborator")
        .send({
          repo: "test-repo-one",
          username: "test-owner",
          secret: "example-secret",
        })
        .expect(200, "Success");
    });

    it("should respond with 422 when Github API reponds with error", async () => {
      new Octokit().repos.__setAddCollaboratorFn(() => {
        // No error
      });
      await request(app)
        .post("/api/add-collaborator")
        .send({
          repo: "test-repo-one",
          username: "test-owner",
          secret: "example-secret",
        })
        .expect(200, "Success");

      new Octokit().repos.__setAddCollaboratorFn(() => {
        throw new Error("Some Github API error");
      });
      await request(app)
        .post("/api/add-collaborator")
        .send({
          repo: "test-repo-one",
          username: "test-owner",
          secret: "example-secret",
        })
        .expect(422, "Github API error. Check username correct.");
    });

    it("should respond with 422 when repository is not one of allowed repositories", async () => {
      new Octokit().repos.__setAddCollaboratorFn(() => {
        // no error
      });
      const res = await request(app)
        .post("/api/add-collaborator")
        .send({
          repo: "test-repo-not-allowed",
          username: "test-owner",
          secret: "example-secret",
        })
        .expect(422, "Validation error");
    });
  });
});
