const mongoose = require("mongoose");

const CoursesPaidSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  courses: [
    {
      courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true,
      },
      status: {
        type: String,
        enum: ["Active", "Completed"],
        default: "Active",
      },
    },
  ],
  purchaseDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("CoursesPaid", CoursesPaidSchema);
