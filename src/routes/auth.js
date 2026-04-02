const express = require("express");
const authRouter = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");

// Post the data of the user in the database
authRouter.post("/signup", async (req, res) => {
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
authRouter.post("/login", async (req, res) => {
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
      const token = jwt.sign({ userId: user._id }, "secretKey", {
        expiresIn: "1d",
      });
      res.cookie("token", token, {
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      });
      res.send("Login successful!");
    }
  } catch (error) {
    res.status(500).send("Error logging in: " + error.message);
  }
});

// Logout the user by clearing the token cookie
authRouter.post("/logout", async (req, res) => {
  if(!req.cookies.token) {
    return res.status(400).send("User is not logged in");
  }
  await  res.clearCookie("token");
  res.send("Logout successful!");
});

module.exports = authRouter;
