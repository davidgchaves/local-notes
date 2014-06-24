describe("App.Collections.Notes", function () {

  describe("an empty notes collection", function () {

    it("is a valid collection", function () {
      var notes = new App.Collections.Notes();
      notes.localStorage._clear();

      expect(notes).to.be.ok;
    });
  });
});
