const express = require('express')
const router = express.Router()
const Question = require('../models/Question')
const Answer = require('../models/Answer')
const User = require('../models/User')
const Tag = require('../models/Tag')
const fetchUserDetails = require('../middleware/fetchUser')

router.get("/get-all-questions", async (req, res) => {
  let success = false;

  try {
    const questions = await Question.find().populate('userId', 'username profilePhoto').sort({ createdAt: -1 });
    success = true;
    res.status(200).json({ success, questions });
  }
  catch (error) {
    console.log(error.message);
    return res.status(500).json({ success, message: "Internal Server Error" });
  }
})

router.get("/get-all-answers", async (req, res) => {
  let success = false;

  try {
    const answers = await Answer.find().populate('userId', 'username profilePhoto').sort
      ({ createdAt: -1 });
    success = true;
    res.status(200).json({ success, answers });
  }
  catch (error) {
    console.log(error.message);
    return res.status(500).json({ success, message: "Internal Server Error" });
  }
})

router.delete("/delete-question/:id", fetchUserDetails, async (req, res) => {
  let success = false;
  const questionId = req.params.id;
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);

    if (user.role !== 'admin') {
      return res.status(403).json({ success, message: "Internal Server Error" });
    }
    const question = await Question.findById(questionId);
    if (!question) {
      return res.status(404).json({ success, message: "Question not found" });
    }

    await Question.findByIdAndDelete(questionId);
    success = true;
    res.status(200).json({ success, message: "Question deleted successfully" });
  }
  catch (error) {
    console.log(error.message);
    return res.status(500).json({ success, message: "Internal Server Error" });
  }
})

router.post("/add-tag", fetchUserDetails, async (req, res) => {
  let success = false;
  const { tagName } = req.body;
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);
    if (user.role !== 'admin') {
      return res.status(403).json({ success, message: "Only admins can add tags" });
    }

    const existingTag = await Tag.findOne({ name: tagName });
    if (existingTag) {
      return res.status(400).json({ success, message: "Tag already exists" });
    }

    const tag = await Tag.create({ name: tagName });
    success = true;
    res.status(201).json({ success, tag });
  }
  catch (error) {
    console.log(error.message);
    return res.status(500).json({ success, message: "Internal Server Error" });
  }
})

router.delete("/delete-tag/:id", fetchUserDetails, async (req, res) => {
  let success = false;
  const tagId = req.params.id;
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);
    if (user.role !== 'admin') {
      return res.status(403).json({ success, message: "Only admins can delete tags" });
    }

    const tag = await Tag.findById(tagId);
    if (!tag) {
      return res.status(404).json({ success, message: "Tag not found" });
    }

    await Tag.findByIdAndDelete(tagId);
    success = true;
    res.status(200).json({ success, message: "Tag deleted successfully" });
  }
  catch (error) {
    console.log(error.message);
    return res.status(500).json({ success, message: "Internal Server Error" });
  }
})

module.exports = router