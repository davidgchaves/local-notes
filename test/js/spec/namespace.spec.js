describe("Namespace", function () {
  it("provides the 'App' object", function () {
    expect(App).to.be.an("object");
  });

  it("initializes the 'Config' property in the 'App' object", function () {
    expect(App).to.include.key("Config");
  });
});
