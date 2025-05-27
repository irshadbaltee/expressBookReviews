const express = require("express");
const axios = require("axios");
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req, res) => {
  return res.status(300).json({ message: "Yet to be implemented" });
});

// Task 10: Get the book list available in the shop (Async/Await)
// Get the book list available in the shop using async/await
public_users.get("/", async function (req, res) {
  try {
    // Simulating async operation with Promise
    const getBooks = () => {
      return new Promise((resolve, reject) => {
        resolve(books);
      });
    };

    const bookList = await getBooks();
    res.status(200).send(JSON.stringify(bookList, null, 4));
  } catch (error) {
    res.status(500).json({ message: "Error fetching book list" });
  }
});


// Task 11: Get book details based on ISBN using async/await
public_users.get("/isbn/:isbn", async function (req, res) {
  const isbn = req.params.isbn;

  try {
    // Simulating async operation with Promise
    const getBookByISBN = (isbn) => {
      return new Promise((resolve, reject) => {
        const book = books[isbn];
        if (book) {
          resolve(book);
        } else {
          reject("Book not found");
        }
      });
    };

    const book = await getBookByISBN(isbn);
    res.status(200).json(book);
  } catch (error) {
    res.status(404).json({ message: error });
  }
});

// Task 12: Get book details based on author using async/await
public_users.get("/author/:author", async function (req, res) {
  const author = req.params.author;

  try {
    // Simulating async operation with Promise
    const getBooksByAuthor = (author) => {
      return new Promise((resolve, reject) => {
        const matchingBooks = [];

        for (let isbn in books) {
          if (books[isbn].author === author) {
            matchingBooks.push(books[isbn]);
          }
        }

        if (matchingBooks.length > 0) {
          resolve(matchingBooks);
        } else {
          reject("No books found by this author");
        }
      });
    };

    const booksByAuthor = await getBooksByAuthor(author);
    res.status(200).json(booksByAuthor);
  } catch (error) {
    res.status(404).json({ message: error });
  }
});

// Task 13: Get book details based on title using async/await
public_users.get("/title/:title", async function (req, res) {
  const title = req.params.title;

  try {
    // Simulating async operation with Promise
    const getBooksByTitle = (title) => {
      return new Promise((resolve, reject) => {
        const matchingBooks = [];

        for (let isbn in books) {
          if (books[isbn].title === title) {
            matchingBooks.push(books[isbn]);
          }
        }

        if (matchingBooks.length > 0) {
          resolve(matchingBooks);
        } else {
          reject("No books found with this title");
        }
      });
    };

    const booksByTitle = await getBooksByTitle(title);
    res.status(200).json(booksByTitle);
  } catch (error) {
    res.status(404).json({ message: error });
  }
});


// Get book review
public_users.get("/review/:isbn", function (req, res) {
  const isbn = req.params.isbn;
  const book = books[isbn];

  if (book) {
    res.send(book.reviews);
  } else {
    res.status(404).send({ message: "Book not found" });
  }
});

module.exports.general = public_users;
