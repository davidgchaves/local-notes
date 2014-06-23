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

  it("initializes the 'Routers' property in the 'App' object", function () {
    expect(App).to.include.key('Routers');
  });

  it("initializes the 'Templates' property in the 'App' object", function () {
    expect(App).to.include.key('Templates');
  });

  it("initializes the 'Views' property in the 'App' object", function () {
    expect(App).to.include.key('Views');
  });

  it("provides the 'app' object", function () {
    expect(app).to.be.an("object");
  });
});
