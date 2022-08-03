-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`

DROP table if exists books;

CREATE table books (
  id BIGINT GENERATED ALWAYS AS IDENTITY,
  title VARCHAR NOT NULL,
  released INT NOT NULL
);

INSERT INTO books (title, released) VALUES
('Good Omens', 1990),
('The Guernsey', 2007),
('The Talisman', 1984),
('Beyond the End of the World', 2022)



