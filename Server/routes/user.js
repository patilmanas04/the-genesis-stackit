const express = require('express')
const router = express.Router()
const Question = require('../models/Question')
const Answer = require('../models/Answer')
const User = require('../models/User')
const fetchUserDetails = require('../middleware/fetchUser')

router.post('/ask-question', fetchUserDetails, async (req, res) => {
  let success = false;
  const { title, description, tags } = req.body;
  const userId = req.user.id

  try {
    const question = await Question.create({
      userId,
      title,
      description,
      tags: tags || [],
    });

    success = true;
    res.status(201).json({ success, question });
  }
  catch (error) {
    console.log(error.message);
    return res.status(500).json({ success, message: "Internal Server Error" });
  }
})

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

router.post('/add-answer', fetchUserDetails, async (req, res) => {
  let success = false;
  const { questionId, content } = req.body;
  const userId = req.user.id;

  try {
    const question = await Question.findById(questionId);
    if (!question) {
      return res.status(404).json({ success, message: "Question not found" });
    }

    const answer = await Answer.create({
      userId,
      content,
      questionId,
      upwardVote: 0,
      downwardVote: 0,
    });

    success = true;
    res.status(201).json({ success, answer });
  }
  catch (error) {
    console.log(error.message);
    return res.status(500).json({ success, message: "Internal Server Error" });
  }
});

router.post("/accept-answer", fetchUserDetails, async (req, res) => {
  let success = false;
  const { questionId, answerId } = req.body;
  const userId = req.user.id;

  try {
    const question = await Question.findById(questionId);
    if (!question) {
      return res.status(404).json({ success, message: "Question not found" });
    }

    if (question.userId.toString() !== userId) {
      return res.status(403).json({ success, message: "You are not authorized to accept answers for this question" });
    }

    const answer = await Answer.findById(answerId);
    if (!answer) {
      return res.status(404).json({ success, message: "Answer not found" });
    }

    question.acceptedAnswerId = answerId;
    await question.save();

    success = true;
    res.json({ success, message: "Answer accepted successfully" });
  }
  catch (error) {
    console.log(error.message);
    return res.status(500).json({ success, message: "Internal Server Error" });
  }
})

router.post("/upvote-answer", fetchUserDetails, async (req, res) => {
  let success = false;
  const { answerId } = req.body;

  try {
    const answer = await Answer.findById(answerId);
    if (!answer) {
      return res.status(404).json({ success, message: "Answer not found" });
    }

    answer.upwardVote += 1;
    answer.likedBy.push(req.user.id);
    if (answer.dislikedBy.includes(req.user.id)) {
      answer.downwardVote -= 1;
      answer.dislikedBy.pull(req.user.id);
    }
    await answer.save();
    success = true;
    res.json({ success, message: "Answer upvoted successfully", answer });
  }
  catch (error) {
    console.log(error.message);
    return res.status(500).json({ success, message: "Internal Server Error" });
  }
})

router.post("/downvote-answer", fetchUserDetails, async (req, res) => {
  let success = false;
  const { answerId } = req.body;

  try {
    const answer = await Answer.findById(answerId);
    if (!answer) {
      return res.status(404).json({ success, message: "Answer not found" });
    }
    answer.downwardVote += 1;
    answer.dislikedBy.push(req.user.id);
    if (answer.likedBy.includes(req.user.id)) {
      answer.upwardVote -= 1;
      answer.likedBy.pull(req.user.id);
    }
    await answer.save();
    success = true;
    res.json({ success, message: "Answer downvoted successfully", answer });
  }
  catch (error) {
    console.log(error.message);
    return res.status(500).json({ success, message: "Internal Server Error" });
  }
})

router.get("/getuser", fetchUserDetails, async (req, res) => {
  let success = false;
  const userId = req.user.id;

  try {
    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({ success, message: "User not found" });
    }
    success = true;
    res.json({ success, user });
  }
  catch (error) {
    console.log(error.message);
    return res.status(500).json({ success, message: "Internal Server Error" });
  }
})

module.exports = router;