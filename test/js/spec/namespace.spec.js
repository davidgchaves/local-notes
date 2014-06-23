describe("Namespace", function () {
  it("provides the 'App' object", function () {
    expect(App).to.be.an("object");
  });

  it("initializes the 'Config' property in the 'App' object", function () {
    expect(App).to.include.key("Config");
  });

  it("initializes the 'Collections' property in the 'App' object", function () {
    expect(App).to.include.key("Collections");
  });

  it("initializes the 'Models' property in the 'App' object", function () {
    expect(App).to.include.key('Models');
  });
});
