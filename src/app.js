const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const bcrypt = require("bcrypt");
const app = express();
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

app.use(express.json());
app.use(cookieParser());

// Post the data of the user in the database
app.post("/signup", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      age,
      gender,
      about,
      photoUrl,
      skills,
      password,
    } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);

    const user = new User({
      firstName,
      lastName,
      email,
      age,
      gender,
      about,
      photoUrl,
      skills,
      password: passwordHash,
    });
    await user.save();
    res.send("User saved successfully!");
  } catch (error) {
    res.status(500).send("Error saving user: " + error.message);
  }
});

// Login the user using email and password
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Invalid Credentials");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error("Invalid Credentials");
    } else {
      const token = await jwt.sign({ userId: user._id }, "secretKey");
      res.cookie("token", token);
      res.send("Login successful!");
    }
  } catch (error) {
    res.status(500).send("Error logging in: " + error.message);
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

// Update the data of the user in the database using _id
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params.userId;
  const data = req.body;

  try {
    const ALLOWED_UPDATES = ["age", "gender", "about", "photoUrl", "skills"];
    const isAllowedUpdates = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k),
    );
    if (!isAllowedUpdates) {
      throw new Error("Update not allowed");
    }
    await User.findByIdAndUpdate(userId, data, { runValidators: true });
    res.send("User updated successfully!");
  } catch (error) {
    res.status(500).send("Update failed: " + error.message);
  }
});

app.get("/profile", async (req, res) => {
  try {
    const cookie = req.cookies;

    const token = cookie.token;
    if (!token) {
      throw new error("No token found");
    }
    const decodedMessage = jwt.verify(token, "secretKey");
    // console.log(decodedMessage);

    const _id = decodedMessage.userId;
    const user = await User.findOne({ _id });
    if (!user) {
      throw new Error("User not found");
    }

    // console.log(cookie);
    res.send(user);
  } catch (error) {
    res.status(500).send("Error " + error.message);
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
