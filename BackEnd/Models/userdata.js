const express = require("express");
const mongoose = require("mongoose");
const validator = require("validator");

function isMNNITEmail(email) {
  return email.endsWith("@mnnit.ac.in");
}
function checkpassword(value) {
  return validator.isStrongPassword(value, {
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  });
}

function checknumber(value) {
  const val = value.toString().length;
  return val >= 10;
}
const user = new mongoose.Schema({
  fullname: {
    type: String,
    lowercase: true,
    required: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    validate: [
      {
        validator: validator.isEmail,
        message: "Invalid email format",
      },
      {
        validator: isMNNITEmail,
        message: "Please Register through MNNIT mail Id",
      },
    ],
  },
  contactNo: {
    type: Number,
    unique: true,
    required: true,
    validate: {
      validator: checknumber,
      message: "Enter valid number !",
    },
  },
  password: {
    type: String,
    required: true,
    required: true,
    validate: {
      validator: checkpassword,
      message: "Please enter strong password ! ",
    },
  },
});

const userdata = new mongoose.model("userdata", user);

module.exports = userdata;
