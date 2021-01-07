// needs to be same object across all instances
// so we put it outside of the class definition
const repos = {
  /**
   * The funciton we are mocking and setting return
   * value for
   *
   * Internally we use a function so that it can throw
   * an error
   */
  addCollaborator() {
    return this.__addCollaboratorFn();
  },
  /**
   * Set the funciton that addCollaborator will run
   */
  __setAddCollaboratorFn(payload) {
    this.__addCollaboratorFn = payload;
  },
};

class Octokit {
  constructor() {
    this.repos = repos;
  }
}

const restMock = {
  Octokit,
};

module.exports = restMock;
