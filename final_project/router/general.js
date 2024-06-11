const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  // Obtain the username and password from the request body
  let username = req.body.username;
  let password = req.body.password;

  // Check if the username and password were provided
  if (!username || !password) {
    return res.status(400).json({message: "Username and password must be provided"});
  }

  // Assuming users is an object where keys are usernames and values are passwords
  // Check if the username already exists
  if (users[username]) {
    return res.status(400).json({message: "Username already exists"});
  }

  // If the username does not exist, register the new user
  users[username] = password;

  // Return a 200 status code and a success message
  return res.status(200).json({message: "User registered successfully"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  let booksList = JSON.stringify(books, null, 2);
  return res.status(200).send(booksList);
});
// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  let isbn = req.params.isbn;

  let book = books[isbn];

  if (!book) {
    return res.status(404).json({message: "Book not found"});
  }

  return res.status(200).json(book);
});  

// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  let author = req.params.author;

  let isbnKeys = Object.keys(books);

  let booksByAuthor = [];

  for (let i = 0; i < isbnKeys.length; i++) {
    if (books[isbnKeys[i]].author === author) {
      booksByAuthor.push(books[isbnKeys[i]]);
    }
  }

  if (booksByAuthor.length === 0) {
    return res.status(404).json({message: "No books found by this author"});
  }

  return res.status(200).json(booksByAuthor);
});


// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  let title = req.params.title;

  let isbnKeys = Object.keys(books);

  let booksByTitle = [];

  for (let i = 0; i < isbnKeys.length; i++) {
    if (books[isbnKeys[i]].title === title) {
      booksByTitle.push(books[isbnKeys[i]]);
    }
  }

  if (booksByTitle.length === 0) {
    return res.status(404).json({message: "No books found with this title"});
  }

  return res.status(200).json(booksByTitle);
});
//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
