const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "author",
    },
    status: {
      type: String,
      default: "available",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("book", BookSchema);
