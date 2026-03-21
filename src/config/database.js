const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://ayushsahu1430_db_user:Gravity260477@namastenode.5fnie5c.mongodb.net/devTinder",
  );
};

module.exports = connectDB;
