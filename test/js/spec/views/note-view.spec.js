describe("App.Views.NoteView", function () {

  function createAndSetupTheTestFixture(that) {
    that.$fixture = $("<div id='note-view-fixture'></div>");
    that.$fixture.empty().appendTo($("#fixtures"));
  }

  function createViewToTriggerNoteRendering(that) {
    that.viewForNote = new App.Views.NoteView({
      el: that.$fixture,
      model: new App.Models.Note()
    });
  }

  function destroyTheNoteToAlsoDestroyTheView(that) {
    that.viewForNote.model.destroy();
  }

  function updateModelToTriggerNoteRendering(that) {
    that.viewForNote.model.set({
      title: "Test Note Title",
      text: "## Test Note Heading\n" + "* List item 1\n" + "* List item 2"
    });
  }

  beforeEach(function () {
    createAndSetupTheTestFixture(this);
  });

  afterEach(function () {
    destroyTheNoteToAlsoDestroyTheView(this);
  });

  it("can render an empty note", function () {
    var $noteTitle, $noteText;

    createViewToTriggerNoteRendering(this);

    $noteTitle = $("#pane-title");
    $noteText = $("#pane-text");

    expect($noteTitle.text()).to.equal("");
    expect($noteTitle.prop("tagName").toLowerCase()).to.equal("h2");

    expect($noteText.text()).to.equal("Edit your note!");
    expect($noteText.html()).to.contain("<p><em>Edit your note!</em></p>");
  });

  it("can render a fairly complicated note", function (done) {
    var $noteTitle, $noteText;

    createViewToTriggerNoteRendering(this);

    this.viewForNote.model.once("change", function () {
      $noteTitle = $("#pane-title");
      $noteText = $("#pane-text");

      expect($noteTitle.text()).to.equal("Test Note Title");

      expect($noteText.html())
        .to.contain("Test Note Heading</h2>").and
        .to.contain("<ul>").and
        .to.contain("<li>List item 2</li>");

      done();
    });

    updateModelToTriggerNoteRendering(this);
  });
});
