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
  if(book){
        return res.status(200).json({
            message: "Requested book isbn=" + isbn +" is shipped",
            book
        });
  }else{
        return res.status(404).send("Book with " + isbn + " not found");
  }
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
    if( Object.keys(requestedByAuthor).length > 0 ){
        return res.status(200).json({
            message: "Requested book by author: " + author +" is shipped",
            book: requestedByAuthor
        });
    }else{
        return res.status(404).send("Book with author:" + author + " not found");
    }
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
    if( Object.keys(requestedByTitle).length > 0 ){
        return res.status(200).json({
            message: "Requested book by title: " + title +" is shipped",
            book: requestedByTitle
        });
    }else{
        return res.status(404).send("Book with title:" + title + " not found");
    }
  
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  let { isbn } = req.params;
  let book = books[parseInt(isbn)];
  if(book){
        const reviews = book["reviews"];
        return res.status(200).json({
            message: "Requested book reviews by isbn=" + isbn +" is shipped",
            reviews
        });
  }else{
        return res.status(404).send("Book by isbn=" + isbn + " not found");
  }
});

module.exports.general = public_users;
