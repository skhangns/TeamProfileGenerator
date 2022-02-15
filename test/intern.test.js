const Intern = require("../lib/Intern.js");

describe("Intern", () => {
  const name = "Linda Young";
  const id = 22;
  const email = "lyoung2@techcompany.com";
  const school = "University of Pennsylvania";
  const role = "Intern";
  const testIntern = new Intern(name, id, email, school);

  it("Should return the correct school", () => {
    expect(testIntern.getSchool()).toBe(school);
  });

  it("Should return the Intern name when requested", () => {
    expect(testIntern.getName()).toBe(name);
  });

  it("Should return the Intern id when requested", () => {
    expect(testIntern.getId()).toBe(id);
  });

  it("Should return the Intern email when requested", () => {
    expect(testIntern.getEmail()).toBe(email);
  });

  it("Should return the Intern role when requested", () => {
    expect(testIntern.getRole()).toBe(role);
  });
});