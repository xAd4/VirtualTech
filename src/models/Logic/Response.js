const mongoose = require("mongoose");

const ResponseSchema = new mongoose.Schema(
  {
    qaId: { type: mongoose.Schema.Types.ObjectId, ref: "QA", required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Response", ResponseSchema);
