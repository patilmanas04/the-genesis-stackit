// utils/hash.js
const bcrypt = require("bcrypt");

const saltRounds = 10;

// Hash a plain password
const hashPassword = async (plainPassword) => {
  const hashed = await bcrypt.hash(plainPassword, saltRounds);
  return hashed;
};

// Compare plain password with hashed one
const comparePassword = async (plainPassword, hashedPassword) => {
  const match = await bcrypt.compare(plainPassword, hashedPassword);
  return match;
};

module.exports = {
  hashPassword,
  comparePassword,
};
