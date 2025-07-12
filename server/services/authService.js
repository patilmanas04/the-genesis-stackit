const User = require("../models/User");
const { hashPassword, comparePassword } = require("../utils/hash");
const { generateToken } = require("../utils/jwt");

/**
 * Register new user
 */
const registerUser = async ({ username, email, password }) => {
  const existingUser = await User.findOne({ $or: [{ email }, { username }] });
  if (existingUser) throw new Error("User already exists");

  const passwordHash = await hashPassword(password);
  const user = new User({ username, email, passwordHash });
  await user.save();
  return user;
};

/**
 * Authenticate user and return token
 */
const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");

  const isMatch = await comparePassword(password, user.passwordHash);
  if (!isMatch) throw new Error("Invalid credentials");

  const token = generateToken(user);
  return {
    token,
    user: { id: user._id, username: user.username, role: user.role },
  };
};

module.exports = {
  registerUser,
  loginUser,
};
