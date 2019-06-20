const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String
  },
  email: {
    type: String
  },
  username: { type: String },
  password: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  status: String,
  address: String,
  agency: String,
  avatarUrl: String,
  startDate: Date,
  phone: String,
  gender: String,
  availability: String,
  birthday: Date,
  projects: [
    {
      name: String,
      description: String,
      technology: String,
      society: String,
      size: String,
      site: String,
      startDate: Date,
      endDate: Date,
      status: String,
      progress: String
    }
  ],
  trainingFollowed: [
    {
      name: String,
      type: String,
      site: String,
      endDate: Date,
      rank: String,
      startDate: Date,
      former: String
    }
  ],
  trainings: [
    {
      name: String,
      type: String,
      site: String,
      endDate: Date,
      rank: String,
      startDate: Date,
      former: String
    }
  ],
  education: [
    {
      school: String,
      university: String,
      diploma: String,
      trainings: String,
      certification: String
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
