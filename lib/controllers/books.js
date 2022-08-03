const { Router } = require('express');
const Book = require('../models/Book');

module.exports = Router()
  .get('/:id', async (req, res) => {
    const data = await Book.getById(req.params.id);
    res.json(data);
  })
  .get('/', async (req, res) => {
    const books = await Book.getAll();
    const ids = books.map((book) => ({ id: book.id, title: book.title, released: book.released }));
    res.json(ids);
  })
  .post('/', async (req, res) => {
    const book = await Book.insert(req.body);
    if (req.body.authorIds) {
      await Promise.all(req.body.authorIds.map((id) => book.addAuthorById(id)));
    }
    res.json(book);
  });


