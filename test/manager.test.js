const Manager = require("../lib/Manager.js");

describe("Manager", () => {
  const name = "Jared Smith";
  const id = 1;
  const email = "jsmith11@techcompany.com";
  const officeNumber = "cubical1A";
  const role = "Manager";
  const testManager = new Manager(name, id, email, officeNumber);

  it("Should return correct office number", () => {
    expect(testManager.officeNumber).toBe(officeNumber);
  });

  it("Should return the Manager name when requested", () => {
    expect(testManager.getName()).toBe(name);
  });

  it("Should return the Manager id when requested", () => {
    expect(testManager.getId()).toBe(id);
  });

  it("Should return the Manager email when requested", () => {
    expect(testManager.getEmail()).toBe(email);
  });

  it("Should return the Manager role when requested", () => {
    expect(testManager.getRole()).toBe(role);
  });
});