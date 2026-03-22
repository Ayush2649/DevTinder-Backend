const mongoose = require("mongoose");
const validator = require("validator");

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
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email: " + value);
        }
      }
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 100,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Please try with a stronger password");
        }
      }
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
        validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Invalid URL: " + value);
        }
      }
    },
    skills: {
        type: [String],
        validate(value) {
            if (value.length > 10) {
                throw new Error("Too many skills");
            }
        },
    }
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", userSchema);
