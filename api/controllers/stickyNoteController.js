const StickyNote = require("../models/StickyNotes");

exports.getStickyNotes = async (req, res) => {
  try {
    const notes = await StickyNote.find();
    res.json(notes);
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

exports.createStickyNote = async (req, res) => {
  try {
    const newNote = new StickyNote(req.body);
    const note = await newNote.save();
    res.json(note);
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

exports.updateStickyNote = async (req, res) => {
  try {
    const note = await StickyNote.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(note);
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

exports.deleteStickyNote = async (req, res) => {
  try {
    await StickyNote.findByIdAndDelete(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).send("Server Error");
  }
};
