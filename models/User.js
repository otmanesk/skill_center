const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  status: String,
  address: String,
  agency: String,
  startDate: Date,
  phoneNumber: String,
  gender: String,
  disponibility: false,
  birthday: Date,
  projects: [
    {
      name: String,
      description: String,
      technology: String,
      society: String,
      Taille: String,
      startDate: Date,
      EndDate: Date,
      technology: String,
      status: String,
      Progress: String
    }
  ],
  formations: [
    {
      name: String,
      Lieu: String,
      EndDate: Date,
      Rank: String
    }
  ],
  role: [
    {
      type: String,
      experience: String
    }
  ],
  skills: [
    {
      name: String,
      value: Number
    }
  ]
});

module.exports = User = mongoose.model("users", UserSchema);
