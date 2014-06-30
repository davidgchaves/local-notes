describe("App.Views.NotesItem", function () {

  function createStubRouter() { return sinon.stub(); }

  function createRealNote() { return new App.Models.Note({ id: "0", title: "title" }); }

  function createViewNotesItemWith(that, realNote, stubRouterNavigation) {
    that.view = new App.Views.NotesItem({ model: realNote },
                                        { router: { navigate: stubRouterNavigation } });
  }

  function removeViewNotesItem(that) {
    that.view.remove();
  }

  describe("remove", function () {

    function preventViewFromActuallyBeenRemovedFromTestEnviromentWhenCalled(that) {
      that.stub(that.view, "remove");
    }

    it("is invoked on model destroy event", sinon.test(function () {
      var stubRouter = createStubRouter();
      var realNote = createRealNote();
      createViewNotesItemWith(this, realNote, stubRouter);
      preventViewFromActuallyBeenRemovedFromTestEnviromentWhenCalled(this);

      this.view.model.trigger("destroy");

      expect(this.view.remove).to.have.been.calledOnce;

      removeViewNotesItem(this);
    }));
  });

  describe("render", function () {

    it("is invoked on model change event", sinon.test(function () {
      var stubRouter = createStubRouter();
      var realNote = createRealNote();
      createViewNotesItemWith(this, realNote, stubRouter);
      this.stub(this.view);

      this.view.model.trigger("change");

      expect(this.view.render).to.have.been.calledOnce;

      removeViewNotesItem(this);
    }));
  });

  describe("actions", function () {

    describe("on list item title click", function () {

      // If you don't perform this step in the specs, they fail.
      function renderViewNotesItem(that) {
        that.view.render().$el;
      }

      it("calls the appropriate view", function() {
        var stubRouterNavigation = createStubRouter();
        var realNote = createRealNote();
        createViewNotesItemWith(this, realNote, stubRouterNavigation);
        //This is really important. It's wrong in the book!!!
        renderViewNotesItem(this);

        this.view.$(".note-view").click();

        expect(stubRouterNavigation).to.be.calledOnce;

        removeViewNotesItem(this);
      });
    });
  });
});
