const mongoose = require("mongoose");

const IssueSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "book",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("issue", IssueSchema);
