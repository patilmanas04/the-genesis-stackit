const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  profilePhoto: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model('users', userSchema)
module.exports = User