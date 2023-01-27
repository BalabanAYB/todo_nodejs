const Books = require("../../modules/Books");
const express = require("express");

const router = express.Router();

const database = {
  books: []
};
[1, 2, 3].forEach(() => database.books.push(new Books()));

router.get('/', (req, res) => {
  const books = database.books;

  res.json(books);
});

router.get('/:id', (req, res) => {
  const {id} = req.params;
  const {books} = database;
  const book = books.filter(el => el.id === id);

  if (book.length) {
    res.json(book);
  } else {

    res.statusCode = 404;
    res.json('Book | not found!');
  }
});

router.post('/', (req, res) => {
  const {title, description, author, favorite, fileCover, fileName} = req.body;

  if (title && description && author && favorite && fileCover && fileName) {
    const newBook = new Books(title, description, author, favorite, fileCover, fileName);
    database.books.push(newBook);

    res.statusCode = 201;
    res.json(newBook);
  } else {

    res.statusCode = 404;
    res.json('Book create error!');
  }
});

router.put('/:id', (req, res) => {
  const {id} = req.params;
  const data = req.body;
  const ind = database.books.findIndex(el => el.id === id);

  if (ind !== -1) {
    database.books[ind] = {...database.books[ind], ...data}

    res.json(database.books[ind])
  } else {
    res.statusCode = 404;
    res.json('Book | not found!');
  }
})

router.delete('/:id', (req, res) => {
  const {id} = req.params;
  database.books = database.books.filter(el => el.id !== id);

  res.json('ok');
});

module.exports = router;
