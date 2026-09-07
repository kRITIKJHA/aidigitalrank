const mongoose = require('mongoose');

const caseStudySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  industry: {
    type: String, // e.g. "D2C Skincare Brand" — kept generic, not a real client name
    required: true,
  },
  challenge: {
    type: String, // What problem the client came in with
    required: true,
  },
  solution: {
    type: String, // What was done about it
    required: true,
  },
  result: {
    type: String, // The outcome — e.g. "42% reduction in CPA in 60 days"
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const CaseStudy = mongoose.model('CaseStudy', caseStudySchema);

module.exports = CaseStudy;