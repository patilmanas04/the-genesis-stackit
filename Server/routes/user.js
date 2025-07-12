const express = require('express')
const router = express.Router()
const Question = require('../models/Question')
const User = require('../models/User')
const fetchUserDetails = require('../middleware/fetchUser')

router.post('/ask-question', async (req, res) => {
  let success = false;
  const { title, description, tags, userId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ success, message: "User not found" });
    }

  }
  catch (error) {
    console.log(error.message);
    return res.status(500).json({ success, message: "Internal Server Error" });
  }
})