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

  it("sets passed attributes", function () {
    var note = new App.Models.Note({
      title: "Grocery List",
      text: "Milk\n Coffee\n Cookies"
    });

    expect(note.get("title")).to.equal("Grocery List");
    expect(note.get("text")).to.equal("Milk\n Coffee\n Cookies");
  });
});
