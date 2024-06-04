const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  return res.status(200).json({
        message: "All books is shipped",
        books
    });
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  let { isbn } = req.params;
  let book = books[parseInt(isbn)];
  return res.status(200).json({
        message: "Requested book isbn=" + isbn +" is shipped",
        book
    });
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const { author } = req.params;
  const requestedByAuthor = {};
  for(let isbn in books){
    if(books.hasOwnProperty(isbn)){
        let book = books[isbn];
        if(book.author === author){
            requestedByAuthor[isbn] = book
            break;
        }
    }
  }
  return res.status(200).json({
        message: "Requested book by author: " + author +" is shipped",
        book: requestedByAuthor
    });
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const { title } = req.params;
  const requestedByTitle = {};
  for(let isbn in books){
    if(books.hasOwnProperty(isbn)){
        let book = books[isbn];
        if(book.title === title){
            requestedByTitle[isbn] = book
            break;
        }
    }
  }
  return res.status(200).json({
        message: "Requested book by title: " + title +" is shipped",
        book: requestedByTitle
    });
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
