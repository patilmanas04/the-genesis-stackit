const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  profilePhoto: { type: String, default: "" },
  reputation: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", userSchema);


// ================================= reference Structure ================================= 

// {
//     _id: ObjectId,
//     username: String, // unique
//     email: String, // unique
//     passwordHash: String,
//     role: String, // "user", "admin"
//     profilePhoto: String, // optional
//     reputation: Number, // for voting weight or status
//     createdAt: Date
//   }
  