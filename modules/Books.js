const randomId = require('node-unique-id-generator');


class Books {
  constructor(
    title = 'Fairy Tale',
    description = 'other description',
    author = 'Stephen King',
    favorite = 'favorite',
    fileCover = 'file cover',
    fileName = 'file name',
    fileBook = 'book',
    id = randomId.generateUniqueId()) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.author = author;
    this.favorite = favorite;
    this.fileCover = fileCover;
    this.fileName = fileName;
    this.fileBook = fileBook;
  }
}

module.exports = Books;
