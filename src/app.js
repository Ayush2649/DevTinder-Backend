const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const app = express();

app.post("/signup", async (req, res) => {
  const user = new User({
    firstName: "Virat",
    lastName: "Kohli",
    email: "virat.kohli@gmail.com",
    password: "password123",
    age: 36,
    gender: "Male",
  });

  try {
    await user.save();
    res.send("User saved successfully!");
  } catch (error) {
    res.status(500).send("Error saving user");
  }

});

connectDB()
  .then(
    console.log("Connected to the database successfully!"),
    app.listen(7777, () => {
      console.log("Server is running on port 7777");
    }),
  )
  .catch((err) => {
    console.error("Error connecting to the database:", err);
  });
