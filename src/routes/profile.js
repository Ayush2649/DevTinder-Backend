const express = require("express");
const { userAuth } = require("../middlewares/auth");
const profileRouter = express.Router();
const { validateEditProfile } = require("../utils/validation");

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

module.exports = profileRouter;
