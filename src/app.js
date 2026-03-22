const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const app = express();

app.use(express.json());

// Post the data of the user in the database
app.post("/signup", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.send("User saved successfully!");
  } catch (error) {
    res.status(500).send("Error saving user");
  }
});

// Get the data of the user from the database using _id
app.get("/user", async (req, res) => {
  const userId = req.body._id;

  try {
    const user = await User.findOne({ _id: userId });
    if (!user) {
      res.status(404).send("User not found");
    } else {
      res.send(user);
    }
  } catch (error) {
    res.status(500).send("Something went wrong");
  }

  // try {
  //   const user = await User.find({ email: userEmail });
  //   if (user.length === 0) {
  //     res.status(404).send("User not found");
  //   } else {
  //     res.send(user);
  //   }
  // } catch (err) {
  //   res.status(500).send("Something went wrong");
  // }
});

// Get the data of all the users from the database
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
});

// Delete the data of the user from the database using _id
app.delete("/user", async (req, res) => {
  const userId = req.body._id;

  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    res.send("User deleted successfully!" + deletedUser);
  } catch (error) {
    res.status(500).send("Something went wrong");
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
