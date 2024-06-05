const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const axios = require('axios').default


public_users.post("/register", (req,res) => {
  //Write your code here
  const { username, password } = req.body;
  if(username && password){
    if(!isValid(username)){
        users.push({"username":username,"password":password});
        return res.status(200).json({
            message: "User successfully registred. Now you can login",
            user:username 
        });
    }else{
        return res.status(404).json({message: "username is already existed"});
    }
  }else{
    return res.status(404).json({message: "username and password are required"});
  }
});


// Get the book list available in the shop
public_users.get('/', async(req, res) => {
    try {
        let response = await axios.get("https://nbmblueeye-5000.theianext-1-labs-prod-misc-tools-us-east-0.proxy.cognitiveclass.ai/");
        let books = await response.data;
        return res.status(200).json({
            message: "All books are shipped",
            books
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: error.message
        })
    }
    //     return res.status(200).json({
    //         message: "All books are shipped",
    //         books
    //     });
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',async(req, res) => {
  //Write your code here
    let { isbn } = req.params;
    try {
        let response = await axios.get("https://nbmblueeye-5000.theianext-1-labs-prod-misc-tools-us-east-0.proxy.cognitiveclass.ai/isbn/" + isbn);
        let book = await response.data;
        return res.status(200).json({
            message: "Requested book isbn=" + isbn +" is shipped",
            book
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: error.message
        })
    }
    // if( Object.keys(books).includes(isbn) ){
    //     let book = books[isbn];
    //     return res.status(200).json({
    //         message: "Requested book isbn=" + isbn +" is shipped",
    //         book
    //     });
    // }else{
    //         return res.status(404).json({ message: "Book with " + isbn + " not found" });
    // }
 });
  
// Get book details based on author
public_users.get('/author/:author', async(req, res) => {
  //Write your code here
    const { author } = req.params;
    try {
        let response = await axios.get("https://nbmblueeye-5000.theianext-1-labs-prod-misc-tools-us-east-0.proxy.cognitiveclass.ai/author/" + author);
        let book = await response.data;
        return res.status(200).json({
            message: "Requested book isbn=" + isbn +" is shipped",
            book
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: error.message
        })
    }
    // const requestedByAuthor = {};
    // for(let isbn in books){
    //     if(books.hasOwnProperty(isbn)){
    //         let book = books[isbn];
    //         if(book.author === author){
    //             requestedByAuthor[isbn] = book
    //             break;
    //         }
    //     }
    // }
    // if( Object.keys(requestedByAuthor).length > 0 ){
    //     return res.status(200).json({
    //         message: "Requested book by author: " + author +" is shipped",
    //         book: requestedByAuthor
    //     });
    // }else{
    //     return res.status(404).json({message: "Book with author:" + author + " not found"});
    // }
});

// Get all books based on title
public_users.get('/title/:title', async(req, res) => {
  //Write your code here
  const { title } = req.params;
  try {
    let response = await axios.get("https://nbmblueeye-5000.theianext-1-labs-prod-misc-tools-us-east-0.proxy.cognitiveclass.ai/title/" + title);
    let book = await response.data;
    return res.status(200).json({
        message: "Requested book isbn=" + isbn +" is shipped",
        book
    });
} catch (error) {
    console.log(error)
    return res.status(500).json({
        message: error.message
    })
}
//const requestedByTitle = {};
//   for(let isbn in books){
//     if(books.hasOwnProperty(isbn)){
//         let book = books[isbn];
//         if(book.title === title){
//             requestedByTitle[isbn] = book
//             break;
//         }
//     }
//   }
//     if( Object.keys(requestedByTitle).length > 0 ){
//         return res.status(200).json({
//             message: "Requested book by title: " + title +" is shipped",
//             book: requestedByTitle
//         });
//     }else{
//         return res.status(404).json({message: "Book with title:" + title + " not found"});
//     }
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  let { isbn } = req.params;
  if( Object.keys(books).includes(isbn) ){
        const reviews = book[isbn]["reviews"];
        return res.status(200).json({
            message: "Requested book reviews by isbn=" + isbn +" is shipped",
            reviews
        });
  }else{
        return res.status(404).json({message: "Book by isbn=" + isbn + " not found"});
  }
});

module.exports.general = public_users;
