const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
    },
    password: {
      type: String,
      required: true,
    },
    mobileNumber: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (v) {
          return /^[6-9]\d{9}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid mobile number!`,
      },
    },
    profileImage: {
      type: String,
    },
    roles: {
      type: String,
      enum: ["admin", "normal"],
      default: "normal",
    },
  },
  { 
    timestamps: true,
    versionKey : false
   }
);

module.exports = mongoose.model("User", userSchema);
