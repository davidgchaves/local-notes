describe("App.Views.Note", function () {

  // This could be considered a canonical example about why you should TDD.
  // The test-pain is so great that makes this whole testing thing completely worthless.
  // The pain is buried in indirection and abstraction (beforeEach), so the spec is readable.
  // 58 lines of code to test which view is displayed by default.... WTF!!!!!!
  // The underlying problem?
  //   1 - Take a look at the constructor in app/js/app/views/note.js --> 18 lines
  //       This should be considered an anti-pattern... SRP anyone?
  //   2 - I'm not sure if this problem is a Backbone design problem
  //       or simply a result of a very poor designed app.
  //   3 - Another thing to consider is that maybe this kind of behaviour should be tested
  //       (aka driven-designed) anywhere else. Maybe from an acceptance test (Cucumber) ???
  //
  //  Anyway, this kind of test and corresponding constructor should never be written in production.
  describe("view modes and actions", function () {

    function defineTopLevelFixture(that) {
      $("#fixtures").append($(
          "<div class='region-note' style='display: none;'></div>" +
          "<div class='region-notes' style='display: none;'></div>"
      ));
    }

    function clearTopLevelFixture(that) {
      $("#fixtures").empty();
    }

    function defineTestFixture(that) {
      that.$fixture = $(
        "<div id='note-fixture'>" +
          "<div id='#note-pane-view-content'></div>" +
        "</div>"
      );
    }

    function appendTestFixture(that) {
      that.$fixture.appendTo($("#fixtures"));
    }

    function unAppendTestFixture(that) {
      that.$fixture.empty();
    }

    function fakeModelDotSave() {
      // Any model change will trigger a 'model.save()', which won't work in the tests
      // Stub the model prototype *once*
      sinon.stub(App.Models.Note.prototype, "save");
    }

    function unFakeModelDotSave() {
      App.Models.Note.prototype.save.restore();
    }

    function deleteViewObjects(that) {
      if (that.view) { that.view.model.destroy(); }
    }

    function setupAndWireRouterSpy(that) {
      that.routerSpy = sinon.spy();
    }

    beforeEach(function () {
      defineTopLevelFixture(this);
      defineTestFixture(this);
      appendTestFixture(this);
      fakeModelDotSave(); // I know, I know... I want to cry too :(
    });

    afterEach(function () {
      unFakeModelDotSave();
      unAppendTestFixture(this);
      deleteViewObjects(this);
      clearTopLevelFixture(this);
    });

    it("displays 'view' by default", function () {
      setupAndWireRouterSpy(this);

      // Yes... This is the SUT :(
      // Now go and figure out what is really doing.
      this.view = new App.Views.Note({
        el: this.$fixture,
        model: new App.Models.Note()
      }, {
        nav: new Backbone.View(),
        router: { navigate: this.routerSpy }
      });

      expect(this.routerSpy).to.be.calledWithMatch(/view$/);
      expect($("#note-pane-view").css("display")).to.not.equal("none");
      expect($("#note-pane-edit").css("display")).to.equal("none");
    });

    it("displays 'edit' on 'update:edit' event", function () {
      setupAndWireRouterSpy(this);
      this.view = new App.Views.Note({
        el: this.$fixture,
        model: new App.Models.Note()
      }, {
        nav: new Backbone.View(),
        router: { navigate: this.routerSpy }
      });

      this.view.trigger("update:edit");

      expect(this.routerSpy).to.be.calledWithMatch(/edit$/);
      expect($("#note-pane-edit").css("display")).to.not.equal("none");
      expect($("#note-pane-view").css("display")).to.equal("none");
    });
  });
});
