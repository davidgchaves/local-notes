describe("App.Collections.Notes", function () {

  describe("an empty notes collection", function () {

    function createEmptyNotesCollectionAndClearLocalStorage () {
      var notes = new App.Collections.Notes();
      notes.localStorage._clear();
      return notes;
    }

    it("is a valid collection", function () {
      var notes = createEmptyNotesCollectionAndClearLocalStorage();

      expect(notes).to.be.ok;
    });

    it("has no notes in it", function () {
      var notes = createEmptyNotesCollectionAndClearLocalStorage();

      expect(notes).to.have.length(0);
    });

    it("has no notes after a fetch", function (done) {
      var notes = createEmptyNotesCollectionAndClearLocalStorage();

      notes.once("reset", function () {
        expect(notes).to.have.length(0);
        done();
      });

      notes.fetch({ reset: true });
    });

    it("can create a new note", function () {
      var notes = createEmptyNotesCollectionAndClearLocalStorage();

      notes.create({
        title: "New Note",
        text: "This is our first note in the collection"
      });

      expect(notes).to.have.length(1);
    });
  });
});
