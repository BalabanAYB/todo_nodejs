const Books = require("../modules/Books");
const express = require("express");

const router = express.Router();

const database = {
  books: []
};
[1, 2, 3].forEach(() => database.books.push(new Books()));

router.get("/", (req, res) => {
  const books = database.books;

  res.render("book/index", {
    title: "Books",
    books: books
  })
});

router.get("/create", (req, res) => {
  res.render("book/create", {
    title: "Book | Create",
    book: {}
  })
});

router.post("/create", (req, res) => {
  const {title, description, author, favorite, fileCover, fileName, fileBook} = req.body;

  const newBook = new Books(title, description, author, favorite, fileCover, fileName, fileBook);
  database.books.unshift(newBook)

  res.status(201).redirect("/book");
})

router.get("/update/:id", (req, res) => {
  const books = database.books;
  const {id} = req.params;

  const ind = books.findIndex(el => el.id === id)

  if (ind !== -1) {
    res.render("book/update", {
      title: "Book | Update",
      book: books[ind]
    })
  } else {
    res.status(404).redirect("/404")
  }
})

router.post("/update/:id", (req, res) => {
  const {title, description, author, favorite, fileCover, fileName, fileBook} = req.body;
  const {id} = req.params;

  const books = database.books;

  const ind = books.findIndex(el => el.id === id)

  if (ind !== -1) {
    books[ind] = {
      ...books[ind],
      title, description, author, favorite, fileCover, fileName, fileBook
    }
    res.redirect(`/book/${id}`)
  } else {
    res.status(404).redirect("/404")
  }
})

router.get("/:id", (req, res) => {
  const {id} = req.params;
  const books = database.books;

  const ind = books.findIndex(el => el.id === id)

  if (ind !== -1) {
    res.render("book/view", {
      title: "Book | View",
      book: books[ind]
    })
  } else {
    res.status(404).redirect("/404")
  }
})

router.post("/delete/:id", (req, res) => {
  const books = database.books;
  const {id} = req.params;

  const ind = books.findIndex(el => el.id === id)

  if (ind !== -1) {
    books.splice(ind, 1);
    res.redirect("/book");
  } else {
    res.status(404).redirect("/404")
  }
});

module.exports = router;
