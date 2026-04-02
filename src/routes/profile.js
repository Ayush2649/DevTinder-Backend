const express = require("express");
const { userAuth } = require("../middlewares/auth");
const profileRouter = express.Router();
const { validateEditProfile } = require("../utils/validation");
const validator = require("validator");
const bcrypt = require("bcrypt");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (error) {
    res.status(500).send("Error " + error.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if(!validateEditProfile(req)) {
      throw new Error("Cannot edit the profile with the given data");
    }

    const user = req.user;

    Object.keys(req.body).forEach((key) => user[key] = req.body[key]);

    await user.save();
    res.json({message: `${user.firstName}, your profile was updated successfully!`}, {data: user});
  } catch (err) {
    res.status(500).send("Error " + err.message);
  }
});

profileRouter.patch("/profile/edit/password", userAuth, async (req, res) => {
  try {
    const user = req.user;
    const { oldPassword, newPassword } = req.body;

    if (!newPassword || !oldPassword) {
      throw new Error("Both new and old passwords are required");
    }

    if(newPassword == oldPassword) {
      throw new Error("New password cannot be the same as the old password");
    }

    const isOldPasswordValid = await bcrypt.compare(oldPassword, user.password);

    if (!isOldPasswordValid) {
      throw new Error("Invalid old password");
    }

    if(!validator.isStrongPassword(newPassword)) {
      throw new Error("Please try with a stronger password");
    }

    const passwordHash = await bcrypt.hash(newPassword, 10);
    user.password = passwordHash;
    await user.save();

    res.send("Password updated successfully!");
  } catch (err) {
    res.status(500).send("Error " + err.message); 
  }
});

module.exports = profileRouter;
