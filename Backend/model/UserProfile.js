const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // one profile per user
    },

    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },

    bio: {
      type: String,
      maxlength: 200,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Profile", profileSchema);