
const Engineer = require("../lib/Engineer.js");

describe("Engineer", () => {
  const name = "Michael Zepeda";
  const id = 44;
  const email = "Mzepeda@techcompany.com";
  const gitHubUsername = "Mzepeda";
  const role = "Engineer";
  const returnedGitHub = `YourUsername`;

  const testEngineer = new Engineer(name, id, email, gitHubUsername);

  it("Should return github linked account", () => {
    expect(testEngineer.getGithub()).toBe(gitHubUsername);
  });

  it("Should return the Engineer name when requested", () => {
    expect(testEngineer.getName()).toBe(name);
  });

  it("Should return the Engineer id when requested", () => {
    expect(testEngineer.getId()).toBe(id);
  });

  it("Should return the Engineer email when requested", () => {
    expect(testEngineer.getEmail()).toBe(email);
  });

  it("Should return the Engineer role when requested", () => {
    expect(testEngineer.getRole()).toBe(role);
  });
});