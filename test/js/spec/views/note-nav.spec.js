describe("App.Views.NoteNav", function () {

  describe("when clicking on the view menu bar item", function () {

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

    it("fires the nav:view event", function () {
      var navViewSpy = sinon.spy();
      defineFixture(this);
      wireFixtureToView(this);
      this.view.on({ "nav:view": navViewSpy });

      this.$fixture.find(".note-view").click();

      expect(navViewSpy).to.have.been.calledOnce;
    });

    it("fires the nav:update:view event", function () {
      var navUpdateViewSpy = sinon.spy();
      defineFixture(this);
      wireFixtureToView(this);
      this.view.on({ "nav:update:view": navUpdateViewSpy });

      this.$fixture.find(".note-view").click();

      expect(navUpdateViewSpy).to.have.been.calledOnce;
    });

    it("does not fire edit or delete events", function () {
      var dontFireMeSpy = sinon.spy();
      defineFixture(this);
      wireFixtureToView(this);
      this.view.on({
        "nav:edit nav:update:edit": dontFireMeSpy,
        "nav:delete nav:update:delete": dontFireMeSpy
      });

      this.$fixture.find(".note-view").click();

      expect(dontFireMeSpy).to.not.have.been.called;
    });
  });
});
