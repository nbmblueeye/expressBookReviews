const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [
    {
        username:"user1",
        password:"user1"
    },
    {
        username:"user2",
        password:"user2"
    }
];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
    const isValidUserName = users.filter((user) => {
        return (user.username === username)
    });
    if(isValidUserName.length > 0){
        return true;
    }else{
        return false;
    }
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
    const isMatchUser = users.filter((user) => {
        return (user.username === username && user.password === password) 
    });
    if(isMatchUser.length > 0){
        return true;
    }else{
        return false;
    }
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  const { username, password } = req.body
  if( !username || !password ){
    return res.status(404).json({message: "username and password are required"});
  }
  if(authenticatedUser(username, password)){
    const accessToken = jwt.sign({ username, password },'access', { expiresIn: 60 * 60 });
    req.session.authorization = { accessToken };
    return res.status(200).json({ 
        message: "User successfully logged in",
    });

  }else{
    return res.status(208).json({message: "Invalid Login. Check username and password"});
  }
    
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
    const { isbn } = req.params;
    const { review } = req.query;
    if( Object.keys(books).includes(isbn) ){
        let reviews = books[isbn]["reviews"];
        if(Object.keys(reviews).length > 0){
            if(Object.keys(reviews).includes(req.user)){
                books[isbn]["reviews"][req.user] = {...reviews[req.user], ...{ review }}
            }else{
                books[isbn]["reviews"][req.user] = { review }
            }
        }else{
            books[isbn]["reviews"][req.user] = { review }
        }
        return res.status(200).json({
            message: "Your review is updated",
        });
    }else{
        return res.status(404).json({ message: "Book with " + isbn + " not found" });
    }

});

regd_users.delete("/auth/review/:isbn", (req, res) => {
    const { isbn } = req.params;
    if( Object.keys(books).includes(isbn) ){
        let reviews = books[isbn]["reviews"];
        for(let key in reviews){
            if(key == req.user && reviews.hasOwnProperty(key)){
                delete books[isbn]["reviews"][key]
            }
        }
        return res.status(200).json({
            message: "Your review is deleted",
        });
    }else{
        
        return res.status(404).json({ message: "Book with " + isbn + " not found" });
    }

});


module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
