const mongoose = require('mongoose');
const { Schema } = mongoose;

const questionSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true
  },
  tags: {
    type: [String],
  },
  acceptedAnswerId: {
    type: Schema.Types.ObjectId,
    ref: 'Answer',
    default: null
  }
}, {
  timestamps: true // automatically adds createdAt and updatedAt
});

module.exports = mongoose.model('Question', questionSchema);
