const mongoose = require('mongoose');

const newsletterSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true, // Prevents the same email from being stored twice
    lowercase: true, // Automatically stores "John@Gmail.com" as "john@gmail.com"
    trim: true, // Removes accidental leading/trailing spaces
  },
  subscribedAt: {
    type: Date,
    default: Date.now,
  },
});

const Newsletter = mongoose.model('Newsletter', newsletterSchema);

module.exports = Newsletter;