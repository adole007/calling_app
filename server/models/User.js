const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  fullName: {
    type: String,
    required: true
  },
  balance: {
    type: Number,
    default: 0
  },
  currency: {
    type: String,
    enum: ['USD', 'GBP'],
    default: 'USD'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', userSchema); 