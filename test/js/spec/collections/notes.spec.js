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
  });
});
