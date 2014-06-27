describe("App.Views.Note", function () {

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

    it("asks for confirmation when deleting a note", sinon.test(function () {
      setupAndWireRouterSpy(this);
      this.view = new App.Views.Note({
        el: this.$fixture,
        model: new App.Models.Note()
      }, {
        nav: new Backbone.View(),
        router: { navigate: this.routerSpy }
      });
      this.stub(window, "confirm").returns(false);

      this.view.deleteNote();

      expect(window.confirm)
        .to.have.been.calledOnce.and
        .to.have.been.calledWith("Delete note?");
    }));
  });

  describe("when a note is deleted", function () {

    function wipeOutView(that) {
      that.view = null;
    }

    afterEach(function () {
      wipeOutView(this);
    });

    it("causes the App.Views.Note object to remove itself", sinon.test(function () {
      setupAndWireRouterSpy(this);
      this.view = new App.Views.Note({
        el: this.$fixture,
        model: new App.Models.Note()
      }, {
        nav: new Backbone.View(),
        router: { navigate: this.routerSpy }
      });
      this.spy(this.view, "remove");

      this.view.model.trigger("destroy");

      expect(this.view.remove).to.be.calledOnce;
    }));

    it("causes the App.Views.NoteView object to remove itself", sinon.test(function () {
      setupAndWireRouterSpy(this);
      this.view = new App.Views.Note({
        el: this.$fixture,
        model: new App.Models.Note()
      }, {
        nav: new Backbone.View(),
        router: { navigate: this.routerSpy }
      });
      this.spy(this.view.noteView, "remove");

      this.view.model.trigger("destroy");

      expect(this.view.noteView.remove).to.be.calledOnce;
    }));
  });

  describe("note rendering", function () {

    it("renders a note", function () {
      setupAndWireRouterSpy(this);

      this.view = new App.Views.Note({
        el: this.$fixture,
        model: new App.Models.Note()
      }, {
        nav: new Backbone.View(),
        router: { navigate: this.routerSpy }
      });

      expect($(".region-note").css("display")).to.not.equal("none");
      expect($(".region-notes").css("display")).to.equal("none");
    });

    it("renders a default note view", function () {
      var $title, $text;
      setupAndWireRouterSpy(this);

      this.view = new App.Views.Note({
        el: this.$fixture,
        model: new App.Models.Note()
      }, {
        nav: new Backbone.View(),
        router: { navigate: this.routerSpy }
      });

      $title = $("#pane-title");
      $text = $("#pane-text");
      expect($title.text()).to.equal("");
      expect($title.prop("tagName")).to.match(/h2/i);
      expect($text.text()).to.equal("Edit your note!");
      expect($text.html()).to.equal("<p><em>Edit your note!</em></p>");
    });

    it("calls render() on model events", sinon.test(function () {
      setupAndWireRouterSpy(this);
      this.view = new App.Views.Note({
        el: this.$fixture,
        model: new App.Models.Note()
      }, {
        nav: new Backbone.View(),
        router: { navigate: this.routerSpy }
      });
      this.spy(this.view, "render");

      this.view.model.trigger("change");

      expect(this.view.render)
        .to.be.calledOnce.and
        .to.have.returned(this.view);
    }));
  });
});
