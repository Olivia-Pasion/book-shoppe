-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`

DROP table if exists books_authors;
DROP table if exists books;
DROP table if exists authors;

CREATE table books (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title VARCHAR NOT NULL,
  released INT NOT NULL
);

INSERT INTO books (title, released) VALUES
('Good Omens', 1990),
('The Guernsey', 2007),
('The Talisman', 1984),
('Beyond the End of the World', 2022);


CREATE table authors (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR NOT NULL,
  dob DATE,
  pob VARCHAR
);

INSERT INTO authors (name, dob, pob) VALUES
  ('Neil Gaiman', '11-10-1960', 'Portchester, United Kingdom'),
  ('Terry Pratchett','4-28-1948','Beaconsfield, United Kingdom'),
  ('Mary Ann Shaffer','12-13-1934','Martinsbug, West Virginia, United States'),
  ('Annie Barrows','01-09-1962','San Diego, California, United States'),
  ('Peter Straub','03-02-1943','Milwaukee, Wisconson, United States'),
  ('Stephen King','01-09-1947','Portland, Maine, United States'),
  ('Meagan Spooner','01-09-1970','Melbourne, Australia'),
  ('Amie Kaufman','01-09-1970','Melbourne, Australia');

  CREATE table books_authors (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    book_id BIGINT,
    author_id BIGINT,
    FOREIGN KEY (book_id) REFERENCES books(id),
    FOREIGN KEY (author_id) REFERENCES authors(id)
  );

  INSERT INTO  books_authors (book_id, author_id) VALUES
    (1, 1),
    (1, 2),
    (2, 3),
    (2, 4),
    (3, 5),
    (3, 6),
    (4, 7),
    (4, 8);

