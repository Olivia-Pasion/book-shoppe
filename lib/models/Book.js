const pool = require('../utils/pool');

module.exports = class Book {
  id;
  title;
  released;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.released = row.released;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM books;');
    return rows.map((row) => new Book(row));
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `SELECT books.*,
        COALESCE(
          json_agg(to_jsonb(authors))
          FILTER (WHERE authors.id IS NOT NULL), '[]'
        ) as authors from books
        LEFT JOIN books_authors
          ON books.id = books_authors.book_id
        LEFT JOIN authors
          ON books_authors.authors_id = authors.id
          WHERE books.id = $1
          GROUP BY books.id`,
      [id]
    );
    
    return new Book(rows[0]);
  }
};


