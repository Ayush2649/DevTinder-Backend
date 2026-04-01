const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      throw new Error("User is not authorized");
    }

    const decodedMessage = jwt.verify(token, "secretKey");

    const { userId } = decodedMessage;

    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).send("ERROR: " + error.message);
  }
};

module.exports = {
  userAuth,
};
