DROP TABLE IF EXISTS books;

CREATE TABLE IF NOT EXISTS books (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    author VARCHAR(255),
    isbn VARCHAR(255),
    shelf VARCHAR(255),
    img VARCHAR(255), 
    description TEXT
);