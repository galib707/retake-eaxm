const express = require("express");
const router = express.Router();
const AuthorSchema = require("../models/AuthorModel");

router.post("/addNewAuthor", async (req, res) => {
  const { author } = req.body;
  console.log("author name", author);
  if (author === undefined) {
    return res.status(400).send("Author name is empty");
  } else {
    let authorRecords = await AuthorSchema.find(
      {},
      { _id: 0, books: 0, createdAt: 0, updatedAt: 0, __v: 0 }
    );
    for (const record of authorRecords) {
      if (record.name.toLowerCase() === author.toLowerCase()) {
        return res.status(400).send("Author name already exists in the record");
      }
    }
    try {
      let newAutor = new AuthorSchema({
        name: author,
      });
      console.log(newAutor);
      let savedAuthor = await newAutor.save();
      return res
        .status(200)
        .send(`New Author has been created with id :${savedAuthor._id}`);
    } catch (error) {
      return res.status(400).send(error);
    }
  }
});

router.get("/listAllAuthors", async (req, res) => {
  try {
    let authorRecords = await AuthorSchema.find(
      {},
      { _id: 0, books: 0, createdAt: 0, updatedAt: 0, __v: 0 }
    );
    let authorList = [];
    for (const record of authorRecords) {
      authorList.push(record.name);
    }
    return res.status(200).json(authorList);
  } catch (error) {
    return res.status(400).send(error);
  }
});

router.get("/:id", async (req, res) => {
  console.log("param id", req.params.id);
  const id = req.params.id.toString();
  try {
    let listOfBooksWrittenBySepcificAuthor = await AuthorSchema.findById(
      {
        _id: id,
      },
      { name: 0, _id: 0, createdAt: 0, updatedAt: 0, __v: 0 }
    ).populate("books", "title");
    // console.log(listOfBooksWrittenBySepcificAuthor["books"]);
    return res.status(200).json(listOfBooksWrittenBySepcificAuthor);
  } catch (error) {
    return res.status(400).send(error);
  }
});

module.exports = router;
