const express = require('express');

const app = express();

app.use("/user", (req, res, next) => {
    console.log("Middleware 1");
    next();
    // res.send("Hello User");
}, (req, res, next) => {
    // res.send("Hello User 2");
    console.log("Middleware 2");
    next()
}, (req, res, next) => {
    // res.send("Hello User 3");
    console.log("Middleware 3");
    next();
}, (req, res, next) => {
    // res.send("Hello User 4");
    console.log("Middleware 4");
    next();
}, (req, res, next) => { 
    // res.send("Hello User 5");
    console.log("Middleware 5");
    next();
});

app.listen(7777, () => {
    console.log('Server is running on port 7777');
});