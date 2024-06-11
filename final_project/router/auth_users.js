const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [{username: 'Un', password: 'Pw'}];

const isValid = (username) => {
  if (typeof username !== 'string' || username.trim() === '') {
    return false;
  }

  if (username.includes(' ')) {
    return false;
  }

  return true;
}

const SECRET_KEY = 'your-secret-key'; 


const authenticatedUser = (username, password) => {
    const user = users.find(user => user.username === username && user.password === password);
  console.log(user)

  if (!user) {
    return false;
  }

  return true;
}

regd_users.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!isValid(username) || !authenticatedUser(username, password)) {
    return res.status(401).json({message: "Invalid username or password"});
  }

  const token = jwt.sign({username: username}, SECRET_KEY, {expiresIn: '1h'});

  return res.status(200).json({token: token});
});

regd_users.put("/auth/review/:isbn", (req, res) => {
  res.status(200).json({message: "Review added/updated successfully"});
});


let reviews = [];

regd_users.delete("/auth/review/:isbn", (req, res) => {
  res.status(200).json({message: "Review deleted successfully"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
