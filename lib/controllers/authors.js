const { Router } = require('express');
const Author = require('../models/Author');

module.exports = Router()
  .get('/:id', async (req, res) => {
    const data = await Author.getById(req.params.id);
    res.json(data);
  })

  .get('/', async (req, res) => {
    const authors = await Author.getAll();
    const ids = authors.map((author) => ({
      id: author.id,
      name: author.name
    }));
    res.json(ids);
  })
  .post('/', async (req, res) => {
    const author = await Author.insert(req.body);
    if (req.body.bookIds) {
      await Promise.all(req.body.bookIds.map((id) => author.addBookById(id)));
    }
    res.json(author);
  });


