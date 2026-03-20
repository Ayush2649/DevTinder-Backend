const express = require('express');

const app = express();

const { adminAuth, userAuth } = require("./middlewares/auth")

app.use("/admin", adminAuth);

app.get("/user/login", (req, res) => {
    res.send("User login");
})

app.get("/user", userAuth, (req, res) => {
    res.send("User data");
})

app.get("/admin/getAllData", (req, res) => {
    res.send("All data for admin");
});

app.get("/admin/deleteUser", (req, res) => {
    res.send("User deleted by admin");
});

app.listen(7777, () => {
    console.log('Server is running on port 7777');
});