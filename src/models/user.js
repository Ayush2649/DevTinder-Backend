const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minlength: 4,
      maxlength: 50,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      unique: true,
      trim: true,
      match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 100,
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "other", "Male", "Female", "Other"].includes(value)) {
          throw new Error("Invalid gender");
        }
      },
    },
    about: {
        type: String,
        default: "This user hasn't added anything about themselves yet.",
        maxlength: 500,
    },
    photoUrl: {
        type: String,
        default: "https://www.pngall.com/wp-content/uploads/5/Profile-PNG-High-Quality-Image.png",
    },
    skills: {
        type: [String],
    }
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", userSchema);
