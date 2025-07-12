const mongoose = require('mongoose');
const { Schema } = mongoose;

const answerSchema = new Schema({
  questionId: {
    type: Schema.Types.ObjectId,
    ref: 'Question',
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true,
  },
  upwardVote: {
    type: Number,
    default: 0
  },
  downwardVote: {
    type: Number,
    default: 0
  },
  likedBy: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  dislikedBy: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
}, {
  timestamps: true // Automatically manages createdAt and updatedAt
});

module.exports = mongoose.model('Answer', answerSchema);
