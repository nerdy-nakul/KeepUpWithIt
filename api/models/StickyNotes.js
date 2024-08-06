const mongoose = require("mongoose");

const StickyNoteSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: "#f5f5dc",
  },
  x: {
    type: Number,
    default: 0,
  },
  y: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("StickyNote", StickyNoteSchema);
