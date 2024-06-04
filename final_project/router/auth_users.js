const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

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
    req.session.authorization = {accessToken, username};
    return res.status(200).json({ 
        message: "User successfully logged in",
    });

  }else{
    return res.status(208).json({message: "Invalid Login. Check username and password"});
  }
    
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
