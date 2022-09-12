const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
require("dotenv").config();
app.use(express.urlencoded({ extended: false }));

const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://123:123@cluster0.ytqrtda.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to database ");
  })
  .catch((err) => {
    console.log("Error connecting to DB");
  });

const server = app.listen(process.env.PORT || 8000, () => {
  const port = server.address().port;
  console.log(`Express is working on port ${port}`);
});

app.use(cors());
app.use(express.static("public"));
app.use(express.json());

const authRoute = require("./routes/auth_route");
app.use("/auth", authRoute);

app.use(authenticateMiddleware);
const collectionRoute = require("./routes/collection_route");
app.use("/authors", collectionRoute);

const bookRoute = require("./routes/book_route");
app.use("/book", bookRoute);

const issuRoute = require("./routes/issue_route");
app.use("/issue", issuRoute);

function authenticateMiddleware(req, res, next) {
  console.log(req.headers);
  const authHeader = req.headers["authorization"];

  if (authHeader === undefined) {
    return res.status(400).json({ error: "No token was provided" });
  }

  const token = authHeader.split(" ")[1];
  console.log(token);
  if (token === undefined) {
    return res.status(400).json({ error: "Proper token was provided" });
  }

  try {
    const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log(payload);
    next();
  } catch (error) {
    return res.status(400).json({ error: error });
  }
}
