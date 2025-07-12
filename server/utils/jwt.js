// utils/jwt.js
const jwt = require("jsonwebtoken");

const secretKey =
  process.env.JWT_SECRET ||
  "e13ca6ae2732a65b8d1f618c2df2d6c18f215c724e8381c640ae9d78bde55cb849c79d00bafef"; // use .env in production

// Generate JWT token
const generateToken = (payload, expiresIn = "30d") => {
  return jwt.sign(payload, secretKey, { expiresIn });
};

// Verify JWT token
const verifyToken = (token) => {
  try {
    return jwt.verify(token, secretKey);
  } catch (err) {
    return null;
  }
};

module.exports = {
  generateToken,
  verifyToken,
};
