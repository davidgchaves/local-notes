describe("App.Views.NoteNav", function () {

  function defineFixture(that) {
    that.$fixture = $(
      "<ul id='note-nav'>" +
      "<li class='note-view'></li>" +
      "<li class='note-edit'></li>" +
      "<li class='note-delete'></li>" +
      "</ul>"
      );
  }

  function wireFixtureToView(that) {
    that.view = new App.Views.NoteNav({ el: that.$fixture });
  }

  beforeEach(function () {
    defineFixture(this);
    wireFixtureToView(this);
  });

  describe("when clicking on the view menu bar item", function () {

    it("fires the nav:view event", function () {
      var navViewSpy = sinon.spy();
      this.view.on({ "nav:view": navViewSpy });

      this.$fixture.find(".note-view").click();

      expect(navViewSpy).to.have.been.calledOnce;
    });

    it("fires the nav:update:view event", function () {
      var navUpdateViewSpy = sinon.spy();
      this.view.on({ "nav:update:view": navUpdateViewSpy });

      this.$fixture.find(".note-view").click();

      expect(navUpdateViewSpy).to.have.been.calledOnce;
    });

    it("does not fire edit or delete events", function () {
      var dontFireMeSpy = sinon.spy();
      this.view.on({
        "nav:edit nav:update:edit": dontFireMeSpy,
        "nav:delete nav:update:delete": dontFireMeSpy
      });

      this.$fixture.find(".note-view").click();

      expect(dontFireMeSpy).to.not.have.been.called;
    });
  });

  describe("when clicking on the edit menu bar item", function () {

    it("fires the nav:edit event", function () {
      var navEditSpy = sinon.spy();
      this.view.on({ "nav:edit": navEditSpy });

      this.$fixture.find(".note-edit").click();

      expect(navEditSpy).to.have.been.calledOnce;
    });

    it("fires the nav:update:edit event", function () {
      var navUpdateEditSpy = sinon.spy();
      this.view.on({ "nav:update:edit": navUpdateEditSpy });

      this.$fixture.find(".note-edit").click();

      expect(navUpdateEditSpy).to.have.been.calledOnce;
    });

    it("does not fire view or delete events", function () {
      var dontFireMeSpy = sinon.spy();
      this.view.on({
        "nav:view nav:update:view": dontFireMeSpy,
        "nav:delete nav:update:delete": dontFireMeSpy
      });

      this.$fixture.find(".note-edit").click();

      expect(dontFireMeSpy).to.not.have.been.called;
    });
  });

  describe("when clicking on the delete menu bar item", function () {

    it("fires the nav:delete event", function () {
      var navDeleteSpy = sinon.spy();
      this.view.on({ "nav:delete": navDeleteSpy });

      this.$fixture.find(".note-delete").click();

      expect(navDeleteSpy).to.have.been.calledOnce;
    });

    it("fires the nav:update:delete event", function () {
      var navUpdateDeleteSpy = sinon.spy();
      this.view.on({ "nav:update:delete": navUpdateDeleteSpy });

      this.$fixture.find(".note-delete").click();

      expect(navUpdateDeleteSpy).to.have.been.calledOnce;
    });

    it("does not fire view or edit events", function () {
      var dontFireMeSpy = sinon.spy();
      this.view.on({
        "nav:view nav:update:view": dontFireMeSpy,
        "nav:edit nav:update:edit": dontFireMeSpy
      });

      this.$fixture.find(".note-delete").click();

      expect(dontFireMeSpy).to.not.have.been.called;
    });
  });

  describe("menu bar display", function () {

    it("has no active navs by default", function () {
      expect(this.view.$("li.active")).to.have.length(0);
    });
  });
});
