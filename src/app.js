const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const bcrypt = require("bcrypt");
const app = express();
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/auth");

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
      const token = jwt.sign({ userId: user._id }, "secretKey", { expiresIn: "1d" });
      res.cookie("token", token, {expires: new Date(Date.now() + 24 * 60 * 60 * 1000)});
      res.send("Login successful!");
    }
  } catch (error) {
    res.status(500).send("Error logging in: " + error.message);
  }
});

app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (error) {
    res.status(500).send("Error " + error.message);
  }
});

app.post("/sendConnectionRequest", userAuth, async (req, res) => {
  const user = req.user;
  console.log("Connection request sent!");
  res.send(user.firstName + " sent a connection request!");
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
