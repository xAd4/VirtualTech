const mongoose = require("mongoose");

const SectionSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  content: [{ type: String }], // URLs de videos, PDFs, etc.
  contentCount: { type: Number, default: 0 },
  totalHours: { type: Number, required: true, min: 0 },
});

module.exports = mongoose.model("Section", SectionSchema);
