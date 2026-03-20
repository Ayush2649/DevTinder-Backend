const express = require('express');

const app = express();

app.get("/user", (req, res) => {
    res.send({ firstname: "Ayush", lastname: "Sahu" });
});

app.post("/user", (req, res) => {
    res.send("Data is being saved to the database.");
});

app.put("/user", (req, res) => {
    res.send("Data is being updated in the database.");
});

app.delete("/user", (req, res) => {
    res.send("Data is being deleted from the database.");
});

app.patch("/user", (req, res) => {
    res.send("Data is being partially updated in the database.");
});

app.use("/test", (req, res) => {
    res.send('This is a test route.');
});

app.listen(7777, () => {
    console.log('Server is running on port 7777');
});