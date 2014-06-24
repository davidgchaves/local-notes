describe("App.Models.Note", function () {
  it("is a valid model", function () {
    var note = new App.Models.Note();
    expect(note).to.be.ok;
  });

  it("has default values", function () {
    var note = new App.Models.Note();
    expect(note.get("title")).to.equal("");
    expect(note.get("text")).to.equal("*Edit your note!*");
    expect(note.get("createdAt")).to.be.a("date");
  });
});
