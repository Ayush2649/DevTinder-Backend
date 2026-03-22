const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
  const user = new User(req.body);

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
