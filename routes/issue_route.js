const express = require("express");
const router = express.Router();
const IssueSchema = require("../models/IssueModel");

router.post("/", async (req, res) => {
  const { user_id, book_id } = req.body;

  if (user_id === undefined || book_id === undefined) {
    return res.status(400).send("user_id and book_id required");
  }
  try {
    let newIssuedBook = new IssueSchema({
      user: user_id,
      book: book_id,
    });

    let saveIssue = await newIssuedBook.save();
    return res.status(200).send(saveIssue._id);
  } catch (error) {
    return res.status(400).send(error);
  }
});
router.get("/allissues", async (req, res) => {
  //   res.send("issue schema reach");
  try {
    let saveIssue = await IssueSchema.find({});
    return res.status(200).send(saveIssue);
  } catch (error) {
    return res.status(400).send(error);
  }
});

router.get("/:id", async (req, res) => {
  console.log(req.params.id);
  try {
    let saveIssue = await IssueSchema.findById(req.params.id);
    return res.status(200).send(saveIssue);
  } catch (error) {}
  //   return res.send("issue route reached");
});

module.exports = router;
