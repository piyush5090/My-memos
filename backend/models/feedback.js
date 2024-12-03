const mongoose = require('mongoose');


const User = require('./user.model');  


const feedbackSchema = new mongoose.Schema(
  {
    feedbackText: {
      type: String,
      required: true,
      trim: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', 
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ['pending', 'reviewed', 'resolved'], 
      default: 'pending',
    },
  },
  { timestamps: true } 
);


const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;
