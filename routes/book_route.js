const express = require("express");
const router = express.Router();
const BookSchema = require("../models/BookModel");
const AuthorSchema = require("../models/AuthorModel");

router.post("/addANewBook", async (req, res) => {
  console.log(req.body);
  const { author_id, title } = req.body;
  console.log(title);
  if (author_id === undefined || title === undefined) {
    return res.status(400).send("Author and book names are required");
  }
  try {
    let newBook = new BookSchema({
      title: title,
      author: author_id,
    });

    let addNewBook = await newBook.save();
    let author = await AuthorSchema.findById(author_id);

    let updateAuthor = JSON.parse(JSON.stringify(author));
    updateAuthor["books"].push(author_id);
    console.log("jsonOBJ", updateAuthor);

    let addUpdateAuthor = await AuthorSchema.findOneAndReplace(
      { _id: author_id },
      updateAuthor
    );
    return res
      .status(200)
      .send(
        `New book added to the record. book id: ${addNewBook._id}, author id ${author_id}`
      );
  } catch (error) {
    return res.status(400).send(error);
  }
});

router.get("/", async (req, res) => {
  console.log(req.query);

  let query = req.query.status;
  console.log(query);
  try {
    let listOfBooks = await BookSchema.find({});

    let allBooks = JSON.parse(JSON.stringify(listOfBooks));
    let filterdBooks = [];
    for (const book of allBooks) {
      console.log(book);
      if (book.status === query) {
        filterdBooks.push(book.title);
      }
    }
    return res.status(200).json(filterdBooks);
  } catch (error) {
    return res.status(400).send(error);
  }
});

router.get("/books", async (req, res) => {
  console.log(req.query);

  let status = req.query.status;
  let author = req.query.author;
  //   console.log(query);
  try {
    let listOfBooks = await BookSchema.find({}).populate("author", "name");

    let allBooks = JSON.parse(JSON.stringify(listOfBooks));
    console.log(allBooks);
    let filterdBooks = [];
    for (const book of allBooks) {
      console.log(book);
      if (book.status === status && book.author["name"] === author) {
        filterdBooks.push(book.title);
      }
    }
    return res.status(200).json(filterdBooks);
  } catch (error) {
    return res.status(400).send(error);
  }
});
module.exports = router;
