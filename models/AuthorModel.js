const mongoose = require("mongoose");

const AuthorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    books: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "book",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("author", AuthorSchema);
